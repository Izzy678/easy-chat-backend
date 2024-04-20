import { Router } from "express";
import { SignInUserHandler, SignOutUserHandler, refreshAccessTokenHandler } from "../controller/auth.controller";
import { ValidateUserInput } from "../../utils/middleware/validation.middleware";
import { signInSchema } from "../validation/auth.validation";

const authRoutes = Router();

authRoutes.post('/sign-in',ValidateUserInput(signInSchema),SignInUserHandler);
authRoutes.post('/sign-out',SignOutUserHandler);
authRoutes.get('/refresh-access-token',refreshAccessTokenHandler);

export default authRoutes;