import { Router } from "express";
import { createUser, deleteUser, getActiveRoutine, getAllUsers, getUserById, setActiveRoutine, updateUser, changePassword } from "../services/user.service.js";
import { verifyToken } from "../utils/auth.js";

const router = Router();

router.get("/partners/:id/active-routine",verifyToken, getActiveRoutine);
router.put("/partners/:id/active-routine",verifyToken, setActiveRoutine);
router.post("/partners", createUser);
router.get("/partners",verifyToken, getAllUsers);
router.get("/partners/:id",verifyToken, getUserById);
router.put("/partners/:id",verifyToken, updateUser);
router.delete("/partners/:id",verifyToken, deleteUser);
router.put("/partners/:id/password", verifyToken, changePassword);

export default router;
