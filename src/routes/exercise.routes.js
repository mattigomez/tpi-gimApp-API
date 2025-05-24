import { Router } from "express";
import { getAllExercises, createExercise } from "../services/exercise.service.js";

const router = Router();

router.get("/exercises", getAllExercises);
router.post("/exercises", createExercise);

export default router;
