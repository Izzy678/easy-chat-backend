import mongoose from "mongoose";
import { ProfileEnum } from "../../utils/enums/profile.enum";

export interface IUser extends Document {
  _id:string
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  profilePicture: string;
  about:string,
  profile:ProfileEnum
}

const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: String,
    lastName: String,
    userName: String,
    email: String,
    password: String,
    profilePicture: String,
    about:String,
    profile:{
      type:String,
      enum:Object.values(ProfileEnum)
    }
  },

  {
    timestamps: true,
  }
);
const userModel = mongoose.model("user", userSchema);
export default userModel;