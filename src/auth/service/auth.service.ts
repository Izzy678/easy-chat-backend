import {
  BadRequestException,
  NotFoundException,
} from "../../utils/error/http.error.";
import { comparePassword } from "../../utils/function/bcrypt";
import { IUser } from "../../users/model/user.model";
import {
  findUserByEmail,
  findUserById,
} from "../../users/servies/user.service";
import { LoginDto } from "../dto/auth.dto";
import { TokenDto } from "../dto/token.dto";
import jwt from "jsonwebtoken";
import { config } from "../../utils/config/environment.config";

export async function signIn(loginDto: LoginDto): Promise<IUser> {
  const { email, password } = loginDto;
  const foundUser = await findUserByEmail(email);
  if (!foundUser) throw new BadRequestException("invalid email or password");
  const isValidPassword = await comparePassword(password, foundUser.password);
  if (!isValidPassword)
    throw new BadRequestException("invalid email or password");
  return foundUser;
}

export async function refreshAccessToken(token: string) {
  try {
    const tokenData = jwt.verify(
      token,
      config.TOKEN.jwtSecretKey
    ) as unknown as TokenDto;
    const user = await findUserById(tokenData.user);
    return generateTokens(user);
  } catch (error) {
    throw new BadRequestException(
      "Invalid Refresh Token Or Refresh Token expired. Login to continue"
    );
  }
}

async function generateTokens(user: IUser) {
  const tokenData: TokenDto = {
    user: user._id as unknown as string,
    email: user.email,
    userName: user.userName,
  };
  return {
    accessToken: jwt.sign(tokenData, config.TOKEN.jwtSecretKey, {
      expiresIn: config.TOKEN.accessTokenTTL,
    }),
    refreshToken: jwt.sign({ email: user.email }, config.TOKEN.jwtSecretKey, {
      expiresIn: config.TOKEN.refreshTokenTTL,
    }),
  };
}
