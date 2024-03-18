import { Request, Response, NextFunction } from "express";
import * as joi from "joi";
import { ValidationSource } from "../enums/validationResource.enum";
import { BadRequestException } from "../error/http.error.";

export const ValidateUserInput =
  (schema: joi.Schema, source: ValidationSource=ValidationSource.BODY) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req[source]);
      if (error) throw new BadRequestException(error.message);
      next();
    } catch (error) {
      next(error);
    }
  };
