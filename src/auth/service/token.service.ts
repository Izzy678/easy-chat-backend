import jwt from "jsonwebtoken";
import { TokenDto } from "../dto/token.dto";
import {
  BadRequestException,
  NotFoundException,
} from "../../utils/error/http.error.";
import userModel, { IUser } from "../../users/model/user.model";
import { config } from "../../utils/config/environment.config";


const { jwtSecretKey, accessTokenTTL, refreshTokenTTL } = config.TOKEN;

export function generateTokens(user:IUser) {
  const accessTokenPayload = {
    email: user.email,
    user: user._id,
    userName: user.userName,
  };
  const accessToken = jwt.sign(accessTokenPayload, jwtSecretKey, {
    expiresIn: accessTokenTTL,
  });

  const refreshTokenPayload = {
    user: user._id,
  };

  const refreshToken = jwt.sign(refreshTokenPayload, jwtSecretKey, {
    expiresIn: refreshTokenTTL,
  });

  return {
    accessToken,
    refreshToken,
  };
}

export function decodeToken(token: string): {
  tokenData: TokenDto | undefined;
  isExpired: boolean;
} {
  try {
    const tokenData = jwt.verify(token, jwtSecretKey) as unknown as TokenDto;
    return {
      tokenData: tokenData,
      isExpired: false,
    };
  } catch (error: any) {
    if (error.message === "jwt expired") {
      return {
        isExpired: true,
        tokenData: undefined,
      };
    } else {
      return {
        isExpired: false,
        tokenData: undefined,
      };
    }
  }
}

export async function reIssueAccessTokens(refreshToken: string) {
  const { tokenData, isExpired } = decodeToken(refreshToken);
  if (isExpired || !tokenData)
    throw new BadRequestException(
      "Invalid refresh token. Please login to get a new access token."
    );
    const user = await userModel.findOne({_id:tokenData.user})
    if (!user) throw new NotFoundException("User not found.");
    return generateTokens(user);
}
