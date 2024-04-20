import express from "express";
import appRoute from "./route";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import { appErrorHandler } from "./utils/middleware/errorHandler.middleware";
import TokenMiddleware from "./utils/middleware/token.middleware";
import connectToDb from "./utils/database/database";
import { config } from "./utils/config/environment.config";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server: http.Server = app.listen(config.port);

connectToDb();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*", // Set origin to '*' to allow requests from any origin
    credentials: true, // Allow cookies and credentials
  })
);
app.use(helmet()); // Sets various security-related HTTP headers
app.use(compression()); // Compresses HTTP responses
app.use(morgan("combined")); // Logs HTTP requests
app.use(TokenMiddleware); //always run and deserialize each time a request comes in
app.use(appRoute); //takes incomming http request and execute it
app.use(appErrorHandler); //Handle any error that kick in our application

app.get("/", (req, res, next) => {
  res.send("Api is working");
});

const io = new Server(server, {});

//const onlineUsers:Record<string,string> = {};
//on client connection code :
/* 
const socket = io(http://localhost:port,{
  quert: {
    userId:"1234567"
  }
})
const socketObj = {
  userId:string,
  message:string
}
socket.emit('sent-message',socket-object)
*/
// const onlineUsers = new Map<string, string>();

// io.on('connection', (socket) => {
//   const  userId  = socket.handshake.query.userId as string

//   if (!onlineUsers.has(userId)) {
//     onlineUsers.set(userId, socket.id);
//   }
// });

// type SentMessageEvent = {
//   message: string;
//   recipientId: string;
// };

// io.on('sent-message', (receivedMessage: SentMessageEvent) => {
//   const recipentSocketId = onlineUsers.get(receivedMessage.recipientId);

//   if (!recipentSocketId) {
//     // Handle the case where the recipient is offline
//     // (e.g., queue the message for later delivery)
//   } else {
//     io.to(recipentSocketId).emit('received-message', receivedMessage.message);
//   }
// });

io.on("connection", (socket) => {
 // console.log("user connected to", socket.id);

  socket.on("joinRoom", (data) => {
   // console.log(data);
    socket.join(data);
  });

  socket.on("sendMessage", (data) => {
   // console.log(data);
    socket.to(data.room).emit("receivedMessage", data);
  });
});
