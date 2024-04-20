import express from "express";
import {
  SendFriendRequestHandler,
  acceptFriendRequestHandler,
  deleteFriendRequestHandler,
  getAllPendingFriendRequestHandler,
} from "../controller/friends.controller";
import requireUser from "../../utils/middleware/requireUser.middleware";

export const friendsRoutes = express();

friendsRoutes.post("/send-request/:recieverId", SendFriendRequestHandler);
friendsRoutes.patch(
  "/accept-request/:friendRequestId",
  acceptFriendRequestHandler
);
friendsRoutes.delete(
  "/delete-request/:friendRequestId",
  deleteFriendRequestHandler
);
friendsRoutes.get(
  "/get-all-pending-request",
  getAllPendingFriendRequestHandler
);
