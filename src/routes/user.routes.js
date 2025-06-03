import { Router } from "express";
import { createUser, deleteUser, getActiveRoutine, getAllUsers, getUserById, setActiveRoutine, updateUser } from "../services/user.service.js";

const router = Router();
// Rutas para partners
router.get("/partners/:id/active-routine", getActiveRoutine);
router.put("/partners/:id/active-routine", setActiveRoutine);
router.post("/partners", createUser);
router.get("/partners", getAllUsers);
router.get("/partners/:id", getUserById);
router.put("/partners/:id", updateUser);
router.delete("/partners/:id", deleteUser);

export default router;
