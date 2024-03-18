import {v2 as cloudinary} from 'cloudinary';
import { config } from './environment.config';

const {cloudName,apiKey,apiSecret} = config.CLOUDINARY;

cloudinary.config({ 
  cloud_name: cloudName, 
  api_key: apiKey, 
  api_secret: apiSecret
});

export default cloudinary;