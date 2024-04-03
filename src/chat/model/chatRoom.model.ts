import mongoose from "mongoose"

  export interface IChatroom extends Document {
    users:mongoose.Schema.Types.ObjectId[]
  }

  const chatroomSchema = new mongoose.Schema({
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
  }]
  },
  {
    timestamps:true
  }
  )

  export const chatroomModel = mongoose.model('chatroom',chatroomSchema);
  