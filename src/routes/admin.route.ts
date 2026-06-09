import { Router } from "express";
import { createUser } from "../controller/admin.controller";
import { authenticate } from "../middleware/auth";
const router = Router();

router.post("/createUser", createUser)

export default router