const router = require("express").Router();
import {
  getUserCart,
  addItemToCart,
  checkoutCart,
  deleteCartItem,
} from "../controllers/cart_controller";
import { isAuthorized } from "../utils/auth";

router.get("/", isAuthorized, getUserCart);
router.post("/", isAuthorized, addItemToCart)
router.delete("/", isAuthorized, deleteCartItem);
router.post("/checkout", checkoutCart)
export default router;
