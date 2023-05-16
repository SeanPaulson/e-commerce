const userRouter = require("express").Router();
import {
  deleteUser,
  getAllOrders,
  getOrder,
  getUser,
  getUsers,
  profileSettings,
  updateProfile,
} from "../controllers/user_controller";
import { isAuthorized } from "../utils/auth";


//TODO remove id param from authed users. if user is authed he/she will have a session cookie. 
userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.delete("/:id", isAuthorized, deleteUser);
userRouter.get("/:id/profile", isAuthorized, profileSettings);
userRouter.put("/:id/profile", isAuthorized, updateProfile);
userRouter.get("/:id/orders", isAuthorized, getAllOrders);
userRouter.get("/:id/orders/:orderID", isAuthorized, getOrder);

module.exports = userRouter;
