import { NextFunction, Response, Request } from "express";
import { AppError } from "../error/app.error";
import log from "../function/logger";

export const appErrorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error) {
   // log.info(error)
    res.status(error.code||500).json({ message: error.message });
  }
  next();
};
