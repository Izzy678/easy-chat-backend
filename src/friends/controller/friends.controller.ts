import { Response, Request, NextFunction } from "express";
import {
  acceptFriendRequest,
  deleteFriendRequest,
  getAllPendingFriendRequest,
  sendFriendRequest,
} from "../service/friend.service";
import { TokenDto } from "../../auth/dto/token.dto";
import { HttpStatusCode } from "../../utils/enums/httpStatusCode.enum";

export async function SendFriendRequestHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const senderId = (res.locals.user as TokenDto).user;
    const reciverId = req.params.recieverId;
    const data = await sendFriendRequest(senderId, reciverId);
    res.status(HttpStatusCode.SUCCESS).send({
      message: "friend request sent successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function acceptFriendRequestHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const friendRequestId = req.params.friendRequestId;
    const data = await acceptFriendRequest(friendRequestId);
    res.status(HttpStatusCode.SUCCESS).send({
      message: "friend request accepted successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteFriendRequestHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const friendRequestId = req.params.friendRequestId;
      const data = await deleteFriendRequest(friendRequestId);
      res.status(HttpStatusCode.SUCCESS).send({
        message: "friend request deleted successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  export async function getAllPendingFriendRequestHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = (res.locals.user as TokenDto).user;
      const data = await getAllPendingFriendRequest(userId);
      res.status(HttpStatusCode.SUCCESS).send({
        message: "user pending friend requestd retrieved successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  }