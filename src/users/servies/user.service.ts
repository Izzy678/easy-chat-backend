import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";
import userModel, { IUser } from "../model/user.model";
import { hashPassword } from "../../utils/function/bcrypt";
import {
  BadRequestException,
  NotFoundException,
} from "../../utils/error/http.error.";
import { TokenDto } from "../../auth/dto/token.dto";


export async function findUserByEmail(email: string) {
  const foundUser = await userModel.findOne({ email });
  return foundUser;
}

export async function findUserById(id: string) {
  const foundUser = await userModel.findById(id);
  if (!foundUser)
    throw new NotFoundException("user with the provided Id not found");
  return foundUser;
}

export async function createUser(createUserDto: CreateUserDto): Promise<IUser> {
  const { email, password } = createUserDto;

  const foundUser = await findUserByEmail(email);
  if (foundUser)
    throw new BadRequestException("user with same email already exist");
  const hashedPassword = await hashPassword(password);
  const createdUser = await userModel.create({
    ...createUserDto,
    password: hashedPassword,
  });
  return createdUser;
}

export async function updateUser(
  updatedUserDto: UpdateUserDto,
  userId: string
): Promise<IUser> {
  const updatedUser = await userModel.findOneAndUpdate(
    { _id: userId },
    updatedUserDto
  );
  if (!updatedUser) throw new BadRequestException("user not found");
  return updatedUser;
}

export async function updateUserProfileImage(tokenData: TokenDto, url: string) {
  const updatedUser = await userModel.findOneAndUpdate(
    { _id: tokenData.user },
    { profilePicture: url }
  );
  if (!updatedUser) throw new NotFoundException("user not found");
  return updatedUser;
}

export async function getAllUsers(tokenData: TokenDto) {
  //implement pagination
  const users = await userModel
    .find({ _id: { $ne: tokenData.user } })
    .select(["-createdAt", "-updatedAt", "-password"]);
  return users;
}


// export async function validateUserPassword(email: string, password: string) {
//   const foundUser = await findUserByEmail(email);
//   if (!foundUser) return false;
//   const isValidPassword = await comparePassword(password, foundUser.password);
//   if (!isValidPassword) return false;
//   return true;
// }
