import { Request, NextFunction, Response } from "express";
import {
  BadRequestException,
  NotFoundException,
  UnAuthorizedException,
} from "../error/http.error.";
import jwt from "jsonwebtoken";
import { config } from "../config/environment.config";

export const deserializeToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) return next();
  const authorizationHeader = req.headers.authorization;
  const [bearer, token] = authorizationHeader.split(" ");
  if (bearer !== "Bearer") {
    throw new NotFoundException("please provide a Bearer token");
  }
  if (!token) {
    throw new UnAuthorizedException("token not found");
  }
  try {
    const payLoad = jwt.verify(token, config.TOKEN.jwtSecretKey);
    res.locals["user"] = payLoad;
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError")
      throw new UnAuthorizedException("Jwt Expired");
    throw new BadRequestException("Invalid Token");
  }
};
