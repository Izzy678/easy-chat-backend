import mongoose, { Mongoose } from "mongoose";
import { FriendStatusEnum } from "../enums/friends.enum";

const friendSchema = new mongoose.Schema({
    status:{
     type:Object.values(FriendStatusEnum)
    },
    senderId:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    },
    recieverId:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    }
    
});

export const friendModel =  mongoose.model('friends',friendSchema);