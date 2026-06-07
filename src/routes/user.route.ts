import {Router} from 'express';
import {registerUser, loginUser} from "../controller/user.controller";
import {authenticate} from "../middleware/auth";
const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
export default router;