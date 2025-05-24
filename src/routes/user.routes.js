import { Router } from "express";
import { getActiveRoutine, setActiveRoutine } from "../services/user.service.js";

const router = Router();

router.get("/users/:id/active-routine", getActiveRoutine);
router.put("/users/:id/active-routine", setActiveRoutine);

export default router;
