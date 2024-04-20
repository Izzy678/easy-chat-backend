import { chatroomModel } from "../../chat/model/chatRoom.model";
import { BadRequestException } from "../../utils/error/http.error.";
import { FriendStatusEnum } from "../enums/friends.enum";
import { friendModel } from "../model/friends.model";

export const sendFriendRequest = async (
  senderId: string,
  recieverId: string
) => {
  //check if the user has previously sent a friend request
  //the frontend is suppose to hanlde this though
  const friendRequestExist = await friendModel.findOne({recieverId,senderId});
  console.log("friendRequestExist",friendRequestExist);
  if(friendRequestExist) throw new BadRequestException('Friend Request Already sent');
  const createdFriendRequest = await friendModel.create({
    recieverId,
    status: FriendStatusEnum.Pending_Sent,
    senderId,
  });
  return createdFriendRequest;
};

export const UnsendFriendRequest = async (friendRequestId:string)=>{
 return await deleteFriendRequest(friendRequestId);
}

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
    recieverId: userId,
    status: FriendStatusEnum.Pending_Sent,
  }).populate('senderId',['-password','-createdAt','-updatedAt'])
  return pendingFriendRequests;
};


//export const getAllUserFriends = async ()
