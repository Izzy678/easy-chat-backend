import mongoose, { Mongoose } from "mongoose";
import { FriendStatusEnum } from "../enums/friends.enum";

const friendSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: Object.values(FriendStatusEnum) // Assuming FriendStatusEnum is an enum
    },
    senderId:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    recieverId:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }
    
});

export const friendModel =  mongoose.model('friends',friendSchema);