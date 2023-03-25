const router = require("express").Router();
import {
  getUserCart,
  addItemToCart,
  checkoutCart,
} from "../controllers/cart_controller";

router.get("/:id", getUserCart);
router.post("/:id", addItemToCart)
router.post("/:id/checkout", checkoutCart)
export default router;
