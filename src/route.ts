import { Router } from "express";
import authRouter from "./auth/route/auth.router";
import userRoutes from "./users/route/user.route";
import fileRoutes from "./file/routes/file.routes";
import chatRoutes from "./chat/routes/chat.routes";
import requireUser from "./utils/middleware/requireUser.middleware";
import { friendsRoutes } from "./friends/routes/friends.route";

const appRoute = Router();

appRoute.use('/api/auth',authRouter);
appRoute.use('/api/users',userRoutes);
appRoute.use('/api/file',fileRoutes);
appRoute.use('/api/chat',chatRoutes);
appRoute.use('/friend',requireUser,friendsRoutes)
export default appRoute;