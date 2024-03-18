import { config } from "../config/environment.config";
import mongoose from "mongoose";
import log from "../function/logger";

async function connectToDb() {
  mongoose
    .connect(config.DATABASE.mongoDbUri)
    .then(() => {
      log.info("connected to mongodb successfully");
    })
    .catch((error) => {
      log.info(`error connecting to mongodb ${error.message}`);
    });
}
export default connectToDb;
