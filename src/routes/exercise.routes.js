import { Router } from "express";
import { verifyToken } from "../utils/auth.js";
import { getAllExercises, createExercise, updateExercise, deleteExercise, getExerciseById } from "../services/exercise.service.js";

const router = Router();

router.get("/exercises",verifyToken, getAllExercises);
router.get("/exercises/:id",verifyToken, getExerciseById);
router.post("/exercises",verifyToken, createExercise);
router.put("/exercises/:id",verifyToken, updateExercise);
router.delete("/exercises/:id",verifyToken, deleteExercise);

export default router;
