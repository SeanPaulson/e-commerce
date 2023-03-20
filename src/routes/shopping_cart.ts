const router = require("express").Router();
import { Response, Request } from "express";
const db = require("../db");
/**
 * export to cart controller!! TODO
 * Post new item to cart or update quantity
 */
router.post("/:id", async (req: Request, res: Response) => {
  try {
    const { prod_id, quantity } = req.body;
    const user_id = req.session.user?.id;
    //find user cart
    const cart_items = await db.query(
      "SELECT prod_id FROM commerce.cart_items WHERE user_id = $1",
      [user_id]
    );
    //if no cart, create cart and add items
    if (cart_items.rows.length === 0) {
      const updatedCart = await db.query(
        "INSERT INTO commerce.cart_items (prod_id, quantity, user_id) VALUES ($1, $2, $3) RETURNING *",
        [prod_id, quantity, user_id]
      );
      updatedCart.rows.length !== 0
        ? res.send("cart updated")
        : res.status(400).send();
    }
    //else loop through items and if item is already in cart update quantity.
    else {
      cart_items.rows.forEach(async (item: { prod_id: Number }) => {
        if ((item.prod_id = prod_id)) {
          const updatedCart = await db.query(
            "UPDATE commerce.cart_items SET quantity = quantity + $1 WHERE prod_id = $2 RETURNING *",
            [quantity, prod_id]
          );
          console.log(updatedCart.rows[0]);
        }
      });
      res.send();
    }
  } catch (err: any) {
    console.log(err.message);
    res.status(400).send(err.message);
  }
});

/**
 * Get cart by user id...hmmm
 */
//router.get(/:id)

export default router;
