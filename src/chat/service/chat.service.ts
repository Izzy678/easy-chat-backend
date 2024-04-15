import { BadRequestException } from "../../utils/error/http.error.";
import { CreateChatDTo, SendChatDto } from "../dto/chat.dto";
import { chatModel } from "../model/chat.model";
import { chatroomModel } from "../model/chatRoom.model";

export const initiateChat = async (
  chatDto: CreateChatDTo,
  senderId: string
) => {
  const chatroom = await chatroomModel.findById(chatDto.chatroomId);
  // console.log("services", chatroom)

  if (!chatroom) {
    //create chatroom
    const createdChatroom = await chatroomModel.create({ users: chatDto.ids });
    const createdChat = await chatModel.create({
      message: chatDto.message,
      chatroom: createdChatroom._id,
    });
    return createdChat;
  }
  const createdChat = await chatModel.create({
    chatroom: chatroom.id,
    message: chatDto.message,
    sender: senderId,
  });
  // console.log("createdchat", createdChat);
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
  // console.log("chatId", chatroomId);
  const foundChats = await chatModel.find({ chatroom: chatroomId });
  if (foundChats?.length < 0)
    throw new BadRequestException("no chats found for this chat room");
  return foundChats;
};

export const getUserChats = async (userId: string) => {
  
  const userChats = await  chatroomModel.find({ users: { $in: [userId] } }).populate({
    path: "users",
    select: "firstName lastName",
  }).exec()
 // console.log("chats", userChats)
  if (!userChats) return;
  return userChats;
};
