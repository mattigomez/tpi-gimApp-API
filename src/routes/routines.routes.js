import { Router } from "express";
import { 
    getAllRoutines,
    getRoutineById,
    createRoutine,
    updateRoutine,
    deleteRoutine
} from "../services/routine.service.js";

const router = Router();

// Rutas para rutinas
router.get("/routines", getAllRoutines);
router.get("/routines/:id", getRoutineById);
router.post("/routines", createRoutine);
router.put("/routines/:id", updateRoutine);
router.delete("/routines/:id", deleteRoutine);

export default router;