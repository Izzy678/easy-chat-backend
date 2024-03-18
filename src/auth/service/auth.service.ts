import { BadRequestException } from "../../utils/error/http.error.";
import { comparePassword } from "../../utils/function/bcrypt";
import { IUser } from "../../users/model/user.model";
import { findUserByEmail } from "../../users/servies/user.service";
import { LoginDto } from "../dto/auth.dto";

export async function signIn(loginDto:LoginDto): Promise<IUser> {
  const { email, password } = loginDto;
  const foundUser = await findUserByEmail(email);
  if (!foundUser) throw new BadRequestException("invalid email or password");
  const isValidPassword = await comparePassword(password, foundUser.password);
  if (!isValidPassword) throw new BadRequestException("invalid email or password");
  return foundUser;
}
