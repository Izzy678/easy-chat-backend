import { chatroomModel } from "../../chat/model/chatRoom.model";
import { FriendStatusEnum } from "../enums/friends.enum";
import { friendModel } from "../model/friends.model";

export const sendFriendRequest = async (
  senderId: string,
  recieverId: string
) => {
  const createdFriendRequest = await friendModel.create({
    recieverId,
    status: FriendStatusEnum.Pending_Sent,
    senderId,
  });
  return createdFriendRequest;
};

export const acceptFriendRequest = async (friendRequestId: string) => {
  const acceptedRequest = await friendModel.findByIdAndUpdate(
    friendRequestId,
    { status: FriendStatusEnum.Accepted },
    { new: true }
  );
  //create a chatRoom for the two users
  const createdChatRoom = await chatroomModel.create({
    users: [acceptedRequest.recieverId, acceptedRequest.senderId],
  });
  return {
    createdChatRoom,
    acceptedRequest,
  };
};

export const deleteFriendRequest = async (friendRequestId: string) => {
  const deleteFriendRequest = await friendModel.findByIdAndDelete(
    friendRequestId
  );
  return deleteFriendRequest;
};

export const getAllPendingFriendRequest = async (userId: String) => {
  const pendingFriendRequests = await friendModel.find({
    acceptedBy: userId,
    status: FriendStatusEnum.Pending_Sent,
  });
  return pendingFriendRequests;
};

//export const getAllUserFriends = async ()
