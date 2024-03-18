import { Request, Response, NextFunction } from "express";
import { uploadImage } from "../service/file.service";
import { BadRequestException } from "../../utils/error/http.error.";
import { HttpStatusCode } from "../../utils/enums/httpStatusCode.enum";

export const ImageUploadHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    try {
        if(!req.file) throw new BadRequestException("no file provided");
        const cloudinaryImagePayload = await uploadImage(req.file);
        if(!cloudinaryImagePayload) throw new BadRequestException("error uplaoding image");
        res.status(HttpStatusCode.SUCCESS).json({
            message: "image uploaded successfuly",
            cloudinaryImagePayload
        });
    } catch (error) {
        next(error);
    }
 
};
