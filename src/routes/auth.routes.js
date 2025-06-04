import { Router } from "express";
import { loginUser} from "../services/user.service.js";
import { verifyToken } from "../utils/auth.js";

const router = Router();

router.post("/login", loginUser);

export default router;