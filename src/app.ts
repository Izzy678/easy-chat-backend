import express from "express";
import appRoute from "./route";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import { appErrorHandler } from "./utils/middleware/errorHandler.middleware";
import TokenMiddleware from "./utils/middleware/token.middleware";
import connectToDb from "./utils/database/database.config";
import { config } from "./utils/config/environment.config";
import log from "./utils/function/logger";
import socket, { Server } from 'socket.io'
import http from 'http';
import { setupSocketConnection } from "./websocket/websocket";

const app = express();
const server = http.createServer(app); // Create an HTTP server using Express

server.listen(config.port, () => { // Start the server using server.listen()
  log.info(`Server listening on port ${config.port}`);
});

export const io =  setupSocketConnection(server);

// const io = new Server(server, {
//   cors: {
//     origin: ['http://localhost:8080']
//   }
// });
const userIdSocketIdMapper = {}

io.on('connection', (socket) => {
  userIdSocketIdMapper['sockedId'] = socket.id;
  console.log(socket.id);
  socket.on('sent-message', (message) => {
    console.log(message);
    io.emit('receive-message', message); // Fix typo in event name
  });
});


app.get('/',(req,res,next)=>{
  res.send("Api is working");
})
connectToDb();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:3000"], // Set origin to '*' to allow requests from any origin
  credentials: true, // Allow cookies and credentials
}));

// app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(helmet()); // Sets various security-related HTTP headers
app.use(compression()); // Compresses HTTP responses
app.use(morgan("combined")); // Logs HTTP requests
app.use(TokenMiddleware); //always run and deserialize each time a request comes in
app.use(appRoute); //takes incomming http request and execute it
app.use(appErrorHandler); //Handle any error that kick in our application
