import {
  ImageExtensionEnum,
  MimeTypeEnum,
} from "../../utils/enums/fileType.enum";
import { BadRequestException } from "../../utils/error/http.error.";
import log from "../../utils/function/logger";
import cloudinary from "../../utils/config/cloudinary.config";
import fs from "fs";


const imageExt = Object.values(ImageExtensionEnum);

export async function uploadImage(file: Express.Multer.File) {
  const ext = file.originalname
    .split(".")
    .pop() as unknown as ImageExtensionEnum;
  if (!imageExt.includes(ext)) {
    deleteFileFromUploadDirectory(file.path);
    throw new BadRequestException(
      `invalid file type, only this file types ${imageExt} are allowed`
    );
  }
  const cloudinaryImagePayload = await cloudinary.uploader.upload(file.path);
  deleteFileFromUploadDirectory(file.path);
  return cloudinaryImagePayload;
}

async function deleteFileFromUploadDirectory(path: string) {
  fs.unlink(path, (error) => {
    if (error) log.info(`error deleting file ${error}`);
    log.info("file deleted successfully");
    return;
  });
}
