import dotenv from "dotenv";
dotenv.config();

export const config = {
  DATABASE: {
    dbPort: process.env.DB_PORT,
    dbHost: process.env.DB_HOST,
    dbPassword: process.env.DB_PASSWORD,
    dbUserName: process.env.DB_USERNAME || "",
    dbName: process.env.DB_NAME,
    dbDialect: process.env.DB_DIALECT || "postgres",
    mongoDbUri: process.env.MONGO_CONNECTION_URI || "",
  },
  TOKEN: {
    accessTokenTTL: process.env.ACESS_TOKEN_TTL,
    refreshTokenTTL: process.env.REFRESH_TOKEN_TTL,
    jwtSecretKey: process.env.JWT_SECRET_KEY || "SECRET-KEY",
  },
  CLOUDINARY: {
    cloudName: process.env.CLOUD_NAME,
    coudSecret : process.env.API_SECRET,
    apiKey:process.env.API_KEY,
    apiSecret:process.env.API_SECRET,
    cloudUrl : process.env.CLOUDINARY_URL
  },
  port:process.env.PORT
};
