import { Request,Response, NextFunction } from "express";
import { decodeToken } from "../../auth/service/token.service";
import { reIssueAccessTokens } from "../../auth/service/token.service";


const TokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("req", req)
  try {
    const accessToken = req.cookies.accessToken;

    const refreshToken = req.cookies.refreshToken;
    console.log(accessToken)
    console.log(refreshToken)
    console.log("checking server");
    if (!accessToken && !refreshToken) {
      return next();
    }
    const { tokenData,isExpired } = decodeToken(accessToken);
    
    if (tokenData) {
      res.locals.user = tokenData;
      return next();
    }

    if (refreshToken && !tokenData) {
      const {accessToken:newAccessToken,refreshToken:newRefrehToken} = await reIssueAccessTokens(refreshToken);
  
      if (newAccessToken) {
  
        res.cookie("accessToken", newAccessToken, {
          maxAge: 900000, // 15 mins
          httpOnly: true,
          domain: "localhost",
          path: "/",
          sameSite: "strict",
          secure: false,
        });
      }
  
      const result = decodeToken(newAccessToken);
  
      res.locals.user = result.tokenData;
      return next();
    }
  } catch (error) {
    next(error)
  }
  return next();
};

export default TokenMiddleware;
