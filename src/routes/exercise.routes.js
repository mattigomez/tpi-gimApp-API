import { Router } from "express";
import { getAllExercises, createExercise, updateExercise, deleteExercise, getExerciseById } from "../services/exercise.service.js";

const router = Router();

router.get("/exercises", getAllExercises);
router.get("/exercises/:id", getExerciseById);
router.post("/exercises", createExercise);
router.put("/exercises/:id", updateExercise);
router.delete("/exercises/:id", deleteExercise);

export default router;
