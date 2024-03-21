import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../enums/httpStatusCode.enum";

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  console.log("user",user)

  if (!user) {
    return res
      .status(HttpStatusCode.UNAUTHORIZED)
      .send({ message: "you are not authorized" });
  }
  return next();
};

export default requireUser;
