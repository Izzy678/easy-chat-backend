import { NextFunction, Request, Response } from "express";
import { createUser, updateUser, updateUserProfileImage } from "../servies/user.service";
import { HttpStatusCode } from "../../utils/enums/httpStatusCode.enum";
import { TokenDto } from "../../auth/dto/token.dto";
import { uploadImage } from "../../file/service/file.service";
import { BadRequestException } from "../../utils/error/http.error.";
import { UpdateUserDto } from "../dto/user.dto";
import {omit} from 'lodash';


export const createUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const createdUser = await createUser(req.body);
    res.status(HttpStatusCode.SUCCESS).json({
      message: "user created successfully",
      createdUser:omit(createdUser,'password')
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
    console.log(tokenData)
    console.log(req.file)
    if(!req.file) throw new BadRequestException("provide an image to upload");
    const cloudinaryImagePayload = await uploadImage(req.file);
    const updatedUser = await updateUser({profilePicture:cloudinaryImagePayload.url},tokenData.user)
    res.status(HttpStatusCode.SUCCESS).json({
      message:"image uploaded successfully",
      updatedUser:omit(updatedUser,'password')
    })
  } catch (error) {
    next(error);
  }
};

export const updateUserProfileHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
)=>{
 try{
   const user  = req.body as UpdateUserDto;
   const tokenData = res.locals.user as TokenDto;
   const updatedUser = updateUser(user,tokenData.user);
   return updatedUser;
 }catch(error){
  next(error);
 }
};

