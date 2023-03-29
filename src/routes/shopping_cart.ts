const router = require("express").Router();
import {
  getUserCart,
  addItemToCart,
  checkoutCart,
} from "../controllers/cart_controller";
import { isAuthorized } from "../utils/auth";

router.get("/:id", isAuthorized, getUserCart);
router.post("/:id", isAuthorized, addItemToCart)
router.post("/:id/checkout", checkoutCart)
export default router;
