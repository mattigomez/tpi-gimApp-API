import { Routine, RoutineExercise } from "../model/Routine.js";
import { Exercise } from "../model/Exercise.js";

export const getAllRoutines = async (req, res) => {
    try {
        const routines = await Routine.findAll({
            include: [{
                model: Exercise,
                as: 'exercises',
                through: {
                    attributes: ['order']
                }
            }],
            order: [
                ['id', 'ASC'],
                [{ model: Exercise, as: 'exercises' }, RoutineExercise, 'order', 'ASC']
            ]
        });
        
        res.status(200).json(routines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getRoutineById = async (req, res) => {
    try {
        const { id } = req.params;
        const routine = await Routine.findOne({
            where: { id },
            include: [{
                model: Exercise,
                as: 'exercises',
                through: {
                    attributes: ['order']
                }
            }],
            order: [
                [{ model: Exercise, as: 'exercises' }, RoutineExercise, 'order', 'ASC']
            ]
        });
        
        if (!routine) {
            return res.status(404).json({ message: "Rutina no encontrada" });
        }
        
        res.status(200).json(routine);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createRoutine = async (req, res) => {
    const transaction = await Routine.sequelize.transaction();
    try {

        const { title, description, level,  exercises } = req.body;
        
        const newRoutine = await Routine.create({
            title,
            description,
            level
        }, { transaction });
        
        if (exercises && exercises.length > 0) {
            const existingExercisesIds = exercises
                .filter(ex => ex.id)
                .map(ex => ex.id);

            const newExercisesPromises = exercises
                .filter(ex => !ex.id)
                .map(ex => Exercise.create({
                    name: ex.name,
                    sets: ex.sets,
                    repetitions: ex.repetitions
                }, { transaction }));

            const newExercises = await Promise.all(newExercisesPromises);
            const newExercisesIds = newExercises.map(ex => ex.id);

            const allExerciseIds = [...existingExercisesIds, ...newExercisesIds];

            for (let i = 0; i < allExerciseIds.length; i++) {
                await RoutineExercise.create({
                    routineId: newRoutine.id,
                    exerciseId: allExerciseIds[i],
                    order: i + 1
                }, { transaction });
            }
        }
        
        await transaction.commit();
        
        const completeRoutine = await Routine.findOne({
            where: { id: newRoutine.id },
            include: [{
                model: Exercise,
                as: 'exercises',
                through: {
                    attributes: ['order']
                }
            }],
            order: [
                [{ model: Exercise, as: 'exercises' }, RoutineExercise, 'order', 'ASC']
            ]
        });
        
        res.status(201).json(completeRoutine);
    } catch (error) {
        console.error(error); 
        await transaction.rollback();
        res.status(500).json({ message: error.message });
    }
};

export const updateRoutine = async (req, res) => {
    const transaction = await Routine.sequelize.transaction();
    
    try {
        const { id } = req.params;
        const { title, description, level, exercises } = req.body;
        
        const routine = await Routine.findByPk(id);
        if (!routine) {
            await transaction.rollback();
            return res.status(404).json({ message: "Rutina no encontrada" });
        }
        
        await routine.update({
            title,
            description,
            level
        }, { transaction });
        
        if (exercises && exercises.length > 0) {
            await RoutineExercise.destroy({
                where: { routineId: id },
                transaction
            });

            const existingExercisesIds = exercises
                .filter(ex => ex.id)
                .map(ex => ex.id);

            const newExercisesPromises = exercises
                .filter(ex => !ex.id)
                .map(ex => Exercise.create({
                    name: ex.name,
                    sets: ex.sets,
                    repetitions: ex.repetitions
                }, { transaction }));

            const newExercises = await Promise.all(newExercisesPromises);
            const newExercisesIds = newExercises.map(ex => ex.id);

            const allExerciseIds = [...existingExercisesIds, ...newExercisesIds];

            for (let i = 0; i < allExerciseIds.length; i++) {
                await RoutineExercise.create({
                    routineId: id,
                    exerciseId: allExerciseIds[i],
                    order: i + 1
                }, { transaction });
            }
        }
        
        await transaction.commit();
        
        const updatedRoutine = await Routine.findOne({
            where: { id },
            include: [{
                model: Exercise,
                as: 'exercises',
                through: {
                    attributes: ['order']
                }
            }],
            order: [
                [{ model: Exercise, as: 'exercises' }, RoutineExercise, 'order', 'ASC']
            ]
        });
        
        res.status(200).json(updatedRoutine);
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: error.message });
    }
};

export const deleteRoutine = async (req, res) => {
    try {
        const { id } = req.params;
        const routine = await Routine.findByPk(id);
        if (!routine) {
            return res.status(404).json({ message: "Rutina no encontrada" });
        }

        await RoutineExercise.destroy({ where: { routineId: id } });
        await routine.destroy();

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllExercises = async (req, res) => {
    try {
        const exercises = await Exercise.findAll();
        res.status(200).json(exercises);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createExercise = async (req, res) => {
    try {
        const { name, description, sets, repetitions } = req.body;
        
        const newExercise = await Exercise.create({
            name,
            description,
            sets,
            repetitions 
        });
        
        res.status(201).json(newExercise);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};