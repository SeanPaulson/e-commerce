const router = require("express").Router();
import {
  getUserCart,
  addItemToCart,
  checkoutCart,
  deleteCartItem,
} from "../controllers/cart_controller";
import { isAuthorized } from "../utils/auth";

router.get("/:id", isAuthorized, getUserCart);
router.post("/:id", isAuthorized, addItemToCart)
router.delete("/:id", isAuthorized, deleteCartItem);
router.post("/:id/checkout", checkoutCart)
export default router;
