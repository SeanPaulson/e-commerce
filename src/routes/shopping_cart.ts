const router = require("express").Router();
import {
  getUserCart,
  addItemToCart,
} from "../controllers/cart_controller";

router.get("/:id", getUserCart);
router.post("/:id", addItemToCart)

export default router;
