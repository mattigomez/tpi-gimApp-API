import { Exercise } from "../model/Exercise.js";

// Obtener todos los ejercicios
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
        console.log("BODY:", req.body); 
        const { name, sets, reps} = req.body;
        const newExercise = await Exercise.create({
            name,
            sets,
            repetitions: reps,
            createdBy: 1  
        });
        res.status(201).json(newExercise);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
