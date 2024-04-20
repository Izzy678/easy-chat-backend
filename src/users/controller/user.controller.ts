import { NextFunction, Request, Response } from "express";
import {
  createUser,
  findUserById,
  getAllUsers,
  updateUser,
  updateUserProfileImage,
} from "../servies/user.service";
import { HttpStatusCode } from "../../utils/enums/httpStatusCode.enum";
import { TokenDto } from "../../auth/dto/token.dto";
import { uploadImage } from "../../file/service/file.service";
import { BadRequestException } from "../../utils/error/http.error.";
import { UpdateUserDto } from "../dto/user.dto";
import { omit } from "lodash";
import userModel from "../model/user.model";

export const createUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const createdUser = await createUser(req.body);
    res.status(HttpStatusCode.SUCCESS).json({
      message: "user created successfully",
      createdUser: omit(createdUser, "password"),
    });
  } catch (error: any) {
    next(error);
  }
};

export const viewUserProfileHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenData = res.locals.user;
  res.send(tokenData);
};

export const uploadUserProfilePictureHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokenData = res.locals.user as TokenDto;
    if (!req.file) throw new BadRequestException("provide an image to upload");
    const cloudinaryImagePayload = await uploadImage(req.file);
    const updatedUser = await updateUser(
      { profilePicture: cloudinaryImagePayload.url },
      tokenData.user
    );
    res.status(HttpStatusCode.SUCCESS).json({
      message: "image uploaded successfully",
      updatedUser: omit(updatedUser, "password"),
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserProfileHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body as UpdateUserDto;
    const tokenData = res.locals.user as TokenDto;
    const updatedUser = updateUser(user, tokenData.user);
    return updatedUser;
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = res.locals.user as TokenDto;
    const foundUser = await findUserById(user);
    res.status(HttpStatusCode.SUCCESS).send({
      message: "found user successfully",
      foundUser,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenData = res.locals.user;
  const users = await getAllUsers(tokenData);
  res.status(HttpStatusCode.SUCCESS).send({
    messsage:"all users retrieved successfully",
    users
  });
};
