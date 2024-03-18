import mongoose from "mongoose";

export interface IUser extends Document {
  _id:string
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  profilePicture: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: String,
    lastName: String,
    userName: String,
    email: String,
    password: String,
    profilePicture: String,
  },

  {
    timestamps: true,
  }
);
const userModel = mongoose.model("user", userSchema);
export default userModel;