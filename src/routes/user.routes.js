import { Router } from "express";
import { getActiveRoutine, setActiveRoutine, createUser, getAllUsers, getUserById, updateUser, deleteUser } from "../services/user.service.js";

const router = Router();
// Rutas para usuarios
router.get("/users/:id/active-routine", getActiveRoutine);
router.put("/users/:id/active-routine", setActiveRoutine);
router.post("/users", createUser);
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.put("/account/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
