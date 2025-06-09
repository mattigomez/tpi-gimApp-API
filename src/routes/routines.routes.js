import { Router } from "express";
import { 
    getAllRoutines,
    getRoutineById,
    createRoutine,
    updateRoutine,
    deleteRoutine
} from "../services/routine.service.js";
import { verifyToken } from "../utils/auth.js";

const router = Router();

router.get("/routines",verifyToken, getAllRoutines);
router.get("/routines/:id",verifyToken, getRoutineById);
router.post("/routines",verifyToken, createRoutine);
router.put("/routines/:id",verifyToken, updateRoutine);
router.delete("/routines/:id",verifyToken, deleteRoutine);

export default router;