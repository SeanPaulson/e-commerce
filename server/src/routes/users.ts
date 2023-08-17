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

userRouter.get("/", getUsers);
userRouter.get("/profile", isAuthorized, profileSettings);
userRouter.put("/profile", isAuthorized, updateProfile);
userRouter.get("/orders", isAuthorized, getAllOrders);
userRouter.get("/orders/:orderID", isAuthorized, getOrder);
userRouter.get("/:id", getUser);
userRouter.delete("/:id", isAuthorized, deleteUser);

module.exports = userRouter;
