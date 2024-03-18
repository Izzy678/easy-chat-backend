import { BadRequestException } from "../../utils/error/http.error.";
import { CreateChatDTo, SendChatDto } from "../dto/chat.dto";
import { chatModel } from "../model/chat.model";
import { chatroomModel } from "../model/chatRoom.model";

export const initiateChat = async (chatDto: CreateChatDTo) => {
  const chatroom = await chatroomModel.findOne({ users: chatDto.ids });

  if (!chatroom) {
    //create chatroom
    const createdChatroom = await chatroomModel.create({ users: chatDto.ids });
    const createdChat = await chatModel.create({
       message:chatDto.message,
       chatroom:createdChatroom._id
    });
    return createdChat;
  }
  const createdChat = await chatModel.create({
   chatroom: chatroom.id,
   message: chatDto.message,
 });
 console.log("createdchat",createdChat);
  return createdChat;
};

// export const sendChat = async (sendChatDto: SendChatDto) => {
//   //check if chatroom exist
//   const foundChatRoom = await chatroomModel.findById(sendChatDto.chatroomId);
//   if (!foundChatRoom) throw new BadRequestException("chat room does not exist");
//   //create chat
//   const createdChat = await chatModel.create({
//     chatRoomId: sendChatDto.chatroomId,
//     message: sendChatDto.message,
//   });
//   return createdChat;
// };

export const getUserChatsForAChatRoom = async (chatroomId: string) => {
  const foundChats = await chatModel.find({ chatroomId });
  if (foundChats.length < 0)
    throw new BadRequestException("no chats found for this chat room");
  return foundChats;
};
