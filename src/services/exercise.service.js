import { Exercise } from "../model/Exercise.js";
import { RoutineExercise } from "../model/Routine.js";

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
        console.log("BODY:", req.body); 
        const { name, sets, repetitions } = req.body;
        const newExercise = await Exercise.create({
            name,
            sets,
            repetitions
        });
        res.status(201).json(newExercise);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const updateExercise = async (req, res) => {
    try {
        const exercise = await Exercise.findByPk(req.params.id);
        if (!exercise) return res.status(404).json({ message: 'Ejercicio no encontrado' });
        await exercise.update(req.body);
        res.json(exercise);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteExercise = async (req, res) => {
    try {
        const count = await RoutineExercise.count({ where: { exerciseId: req.params.id } });
        if (count > 0) {
            return res.status(400).json({ message: 'No se puede eliminar el ejercicio porque está vinculado a una rutina.' });
        }
        const exercise = await Exercise.findByPk(req.params.id);
        if (!exercise) return res.status(404).json({ message: 'Ejercicio no encontrado' });
        await exercise.destroy();
        res.json({ message: 'Ejercicio eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getExerciseById = async (req, res) => {
    try {
        const exercise = await Exercise.findByPk(req.params.id);
        if (!exercise) return res.status(404).json({ message: 'Ejercicio no encontrado' });
        res.json(exercise);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
