import { Router } from "express";
import { loginUser} from "../services/user.service.js";

const router = Router();

router.post("/login", loginUser);

export default router;