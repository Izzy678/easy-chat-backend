import { Router } from "express";
import requireUser from "../../utils/middleware/requireUser.middleware";
import { ValidateUserInput } from "../../utils/middleware/validation.middleware";
import {
  getChatsHandler,
  getUserConversations,
  initiateChatHandler,
} from "../controller/chat.controller";
import { initiateChatSchema } from "../validator/chat.validator";

const chatRoutes = Router();

chatRoutes.post(
  "/initiate-chat",
  [requireUser, ValidateUserInput(initiateChatSchema)],
  initiateChatHandler
);
chatRoutes.get("/get-user-conversation", requireUser, getUserConversations);
//chatRoutes.post('/send-chat',[requireUser,ValidateUserInput(sendChatSchema)],sendChatHandler);
chatRoutes.get("/get-user-chat/:chatRoomId", requireUser, getChatsHandler);
export default chatRoutes;
