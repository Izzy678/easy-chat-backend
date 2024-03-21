import { Router } from "express";
import { createUserHandler, getUser, updateUserProfileHandler, uploadUserProfilePictureHandler, viewUserProfileHandler } from "../controller/user.controller";
import { ValidateUserInput } from "../../utils/middleware/validation.middleware";
import { signUpSchema, updateUserSchema } from "../validator/user.validator";
import requireUser from "../../utils/middleware/requireUser.middleware";
import upload from "../../utils/config/multer.config";

const userRoutes = Router();

userRoutes.post('/sign-up',ValidateUserInput(signUpSchema),createUserHandler);
userRoutes.get('/view-profile',viewUserProfileHandler);
userRoutes.patch('/update-profile',[requireUser,upload.single('image')],uploadUserProfilePictureHandler);
userRoutes.get('/getMe',requireUser,getUser);
export default userRoutes;