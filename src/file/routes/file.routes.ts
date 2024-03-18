import { Router } from "express";
import { ImageUploadHandler } from "../controller/file.controller";
import upload from "../../utils/config/multer.config";

const fileRoutes  = Router();


fileRoutes.post('/upload-image',upload.single('image'),ImageUploadHandler);

export default fileRoutes;