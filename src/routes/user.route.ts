import { Router } from "express";
import { validateRequest } from "../middleware/requestValidator";
import { userSchema } from "../validators/user.validator";
import { login, signup } from "../controller/user";

const router = Router();

router.post("/signup", validateRequest(userSchema), signup);
router.get("/login", validateRequest(userSchema), login);

export default router;
