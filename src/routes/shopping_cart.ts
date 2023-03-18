const router = require("express").Router();
import { Response, Request } from "express";
const db = require("../db");
/**
 * Make sure db.query will throw a error on its own and skip if statement
 * Also not sure if response should contain anything.
 */
router.post("/id", async (req: Request, res: Response) => {
  try {
    if (req.session.user && req.session.authorized) {
      const { prod_id, quantity } = req.body;
      const { user_id } = req.session.user.id;
      const updated = db.query(
        "INSERT INTO commerce.cart_items (prod_id, quantity) VALUES ($1, $2) WHERE user_id = $3",
        [prod_id, quantity, user_id]
      );
      return res.send(updated.rows[0]);
    }
  } catch (err: any) {
    console.log(err.message);
    res.status(400).send(err.message);
  }
});

export default router;
