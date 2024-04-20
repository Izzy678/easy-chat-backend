import { Request, Response, NextFunction } from "express";
import { signIn } from "../service/auth.service";
import { HttpStatusCode } from "../../utils/enums/httpStatusCode.enum";
import { generateTokens } from "../service/token.service";

export async function SignInUserHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await signIn(req.body);
    //generate token
    const { accessToken, refreshToken } = generateTokens(user);
    res.cookie("accessToken", accessToken, {
      maxAge: 900000, // 15 mins
      httpOnly: true,
      // No need to specify domain when using default Elastic Beanstalk domain
      path: "/",
      secure: false, // Set to true if using HTTPS
    });
    
    res.cookie("refreshToken", refreshToken, {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      httpOnly: true,
      // No need to specify domain when using default Elastic Beanstalk domain
      path: "/",
      secure: false, // Set to true if using HTTPS
    });
    res
      .status(HttpStatusCode.SUCCESS)
      .json({ user, accessToken, message: "sign in successfully" });
  } catch (error) {
    next(error);
  }
}

export async function SignOutUserHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const tokenData = res.locals.user;
    if(tokenData)
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    res
      .status(HttpStatusCode.SUCCESS)
      .send({ message: "signout successfully" });
  } catch (error: any) {
    next(error);
  }
}
