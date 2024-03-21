import mongoose, { Document, Mongoose, mongo } from "mongoose";

export interface Ichat extends Document {
  message: string;
  sender: string;
  chatroom: mongoose.Schema.Types.ObjectId;
}

const chatSchema = new mongoose.Schema<Ichat>(
  {
    message: String,
    sender: String,
    chatroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chatroom",
    },
  },
  {
    timestamps: true,
  }
);

export const chatModel = mongoose.model("chat", chatSchema);
