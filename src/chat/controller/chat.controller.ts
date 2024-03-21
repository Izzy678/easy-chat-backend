import { Response, Request, NextFunction } from "express";
import { TokenDto } from "../../auth/dto/token.dto";
import {
  getUserChats,
  getUserChatsForAChatRoom,
  initiateChat,
} from "../service/chat.service";
import { SendChatDto, CreateChatDTo } from "../dto/chat.dto";
import { HttpStatusCode } from "../../utils/enums/httpStatusCode.enum";

export async function initiateChatHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("id",res.locals.user.user);
  try {
    const createChat = req.body as CreateChatDTo;
    const createdChat = await initiateChat(createChat, res.locals.user.user);
    res
      .status(HttpStatusCode.SUCCESS)
      .send({ message: "chat sent successfully", createdChat });
  } catch (error) {
    next(error);
  }
}

// export async function sendChatHandler(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const sendChatDto = req.body as SendChatDto;
//     const sentChat = await sendChat(sendChatDto);
//     res
//       .status(HttpStatusCode.SUCCESS)
//       .send({ message: "chat sent successfully", sentChat });
//   } catch (error) {
//     next(error);
//   }
// }

export async function getChatsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("fromcontrol", req.params.chatRoomId);
  try {
    const chats = await getUserChatsForAChatRoom(req.params.chatRoomId);
    res
      .status(HttpStatusCode.SUCCESS)
      .send({ message: "chats retrieved successfully", chats });
  } catch (error) {
    next(error);
  }
}
export async function getUserConversations(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("fromcontrol", req.params.chatRoomId);
  try {
    const chats = await getUserChats(res.locals.user.user);
    res
      .status(HttpStatusCode.SUCCESS)
      .send({ message: "chats retrieved successfully", chats });
  } catch (error) {
    next(error);
  }
}
