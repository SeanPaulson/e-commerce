const router = require("express").Router();
import {
  getUserCart,
  addItemToCart,
} from "../controllers/cart_controller";

// get /  --getCart
router.get("/:id", getUserCart);
//post add item to cart
router.post("/:id", addItemToCart)

// update /id: --updateCart quantity
// router.put("/:id");

//delete cart

export default router;
