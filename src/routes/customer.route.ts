import {Router} from 'express';
import {getCustomer, createCustomer} from "../controller/customer.controller";
import { authenticate } from '../middleware/auth';
const router = Router();

router.get("/:id", authenticate, getCustomer);
router.post("/", authenticate, createCustomer);

export default router;
