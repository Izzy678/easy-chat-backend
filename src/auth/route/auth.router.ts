import { Router } from "express";
import { SignInUserHandler, SignOutUserHandler } from "../controller/auth.controller";
import { ValidateUserInput } from "../../utils/middleware/validation.middleware";
import { signInSchema } from "../validation/auth.validation";

const authRoutes = Router();

authRoutes.get('/sign-in',ValidateUserInput(signInSchema),SignInUserHandler);
authRoutes.post('/sign-out',SignOutUserHandler);

export default authRoutes;