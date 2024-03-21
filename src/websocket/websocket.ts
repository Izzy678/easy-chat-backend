import { Server, Socket } from "socket.io";
import http from 'http';

export function setupSocketConnection(server:http.Server){
    const io = new Server(server, {
        cors: {
          origin: ['http://localhost:8080']
        }
      });
      //return io instance to listen to the connection
      return io;
}

export const mapUserIDToSocketId = (userId:string, sockedId:string) => {
  
}