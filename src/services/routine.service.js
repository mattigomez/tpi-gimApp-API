import { Routine, RoutineExercise } from "../model/Routine.js";
import { Exercise } from "../model/Exercise.js";

// Obtener todas las rutinas con sus ejercicios
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

// Obtener una rutina específica por ID
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

// Crear una nueva rutina
export const createRoutine = async (req, res) => {
    const transaction = await Routine.sequelize.transaction();
    try {
        // Agrega createdBy al destructuring
        const { title, description, level, createdBy, exercises } = req.body;
        
        // Crear la rutina con createdBy
        const newRoutine = await Routine.create({
            title,
            description,
            level,
            createdBy
        }, { transaction });
        
        // Si hay ejercicios, asociarlos a la rutina
        if (exercises && exercises.length > 0) {
            // Obtener IDs de los ejercicios que ya existen
            const existingExercisesIds = exercises
                .filter(ex => ex.id)
                .map(ex => ex.id);

            // Crear nuevos ejercicios si es necesario
            const newExercisesPromises = exercises
                .filter(ex => !ex.id)
                .map(ex => Exercise.create({
                    name: ex.name,
                    sets: ex.sets,
                    repetitions: ex.repeticiones,
                    createdBy: ex.createdBy
                }, { transaction }));

            const newExercises = await Promise.all(newExercisesPromises);
            const newExercisesIds = newExercises.map(ex => ex.id);

            // Combinar todos los IDs de ejercicios
            const allExerciseIds = [...existingExercisesIds, ...newExercisesIds];

            // Asociar ejercicios a la rutina con su orden correspondiente
            for (let i = 0; i < allExerciseIds.length; i++) {
                await RoutineExercise.create({
                    routineId: newRoutine.id,
                    exerciseId: allExerciseIds[i],
                    order: i + 1
                }, { transaction });
            }
        }
        
        await transaction.commit();
        
        // Obtener la rutina completa con ejercicios para devolverla en la respuesta
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
        await transaction.rollback();
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una rutina existente
export const updateRoutine = async (req, res) => {
    const transaction = await Routine.sequelize.transaction();
    
    try {
        const { id } = req.params;
        const { title, description, level, exercises } = req.body;
        
        // Verificar si la rutina existe
        const routine = await Routine.findByPk(id);
        if (!routine) {
            await transaction.rollback();
            return res.status(404).json({ message: "Rutina no encontrada" });
        }
        
        // Actualizar los datos básicos de la rutina
        await routine.update({
            title,
            description,
            level
        }, { transaction });
        
        // Si hay ejercicios, actualizar las asociaciones
        if (exercises && exercises.length > 0) {
            // Eliminar todas las asociaciones actuales
            await RoutineExercise.destroy({
                where: { routineId: id },
                transaction
            });

            // Obtener IDs de los ejercicios que ya existen
            const existingExercisesIds = exercises
                .filter(ex => ex.id)
                .map(ex => ex.id);

            // Crear nuevos ejercicios si es necesario
            const newExercisesPromises = exercises
                .filter(ex => !ex.id)
                .map(ex => Exercise.create({
                    name: ex.name,
                    sets: ex.sets,
                    repetitions: ex.repetitions,
                    createdBy: ex.createdBy
                }, { transaction }));

            const newExercises = await Promise.all(newExercisesPromises);
            const newExercisesIds = newExercises.map(ex => ex.id);

            // Combinar todos los IDs de ejercicios
            const allExerciseIds = [...existingExercisesIds, ...newExercisesIds];

            // Asociar ejercicios a la rutina con su orden correspondiente
            for (let i = 0; i < allExerciseIds.length; i++) {
                await RoutineExercise.create({
                    routineId: id,
                    exerciseId: allExerciseIds[i],
                    order: i + 1
                }, { transaction });
            }
        }
        
        await transaction.commit();
        
        // Obtener la rutina actualizada con ejercicios para devolverla en la respuesta
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

// Eliminar una rutina
export const deleteRoutine = async (req, res) => {
    try {
        const { id } = req.params;
        
        const routine = await Routine.findByPk(id);
        if (!routine) {
            return res.status(404).json({ message: "Rutina no encontrada" });
        }
        
        await routine.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener ejercicios 
export const getAllExercises = async (req, res) => {
    try {
        const exercises = await Exercise.findAll();
        res.status(200).json(exercises);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo ejercicio
export const createExercise = async (req, res) => {
    try {
        const { name, description, sets, repetitions, duration, imageUrl, videoUrl } = req.body;
        
        const newExercise = await Exercise.create({
            name,
            description,
            sets,
            repetitions, 
            duration,
            imageUrl,
            videoUrl
        });
        
        res.status(201).json(newExercise);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};