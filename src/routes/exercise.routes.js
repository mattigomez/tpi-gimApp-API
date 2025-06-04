import { Router } from "express";
import { getAllExercises, createExercise } from "../services/exercise.service.js";
import { verifyToken } from "../utils/auth.js";

const router = Router();

router.get("/exercises",verifyToken, getAllExercises);
router.post("/exercises",verifyToken, createExercise);

export default router;
