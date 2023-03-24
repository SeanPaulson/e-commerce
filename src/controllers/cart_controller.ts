import { NextFunction, Request, Response } from "express";
const db = require("../db");

//add new cart item
export const addItemToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { prod_id, quantity } = req.body;
    const user_id = req.session.user?.id;
    const newCart = await db.getClient(
      "INSERT INTO commerce.cart_items (prod_id, quantity, user_id) VALUES ($1, $2, $3) ON CONFLICT (user_id, prod_id) DO UPDATE SET quantity = $2 RETURNING *",
      [prod_id, quantity, user_id]
    );
    if (newCart.rows.length === 0) {
      res.send('could not update cart');
    } else {
      req.session.user!.cart = 1;
      res.send(newCart.rows[0]);
    }
  } catch (err: any) {
    return err.message;
  }
};
//get cart items
/**
 * @param req
 * @param res
 * @param next
 * @returns Promise<Request, Response> or calls nextFunc
 */
export const getUserCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id = req.session.user?.id;
    const cart_items = await db.query(
      `SELECT 
	      product.name, 
	      product.description, 
	      product.price, 
	      quantity,
	      product.price * quantity AS total
      FROM commerce.cart_items 
      INNER JOIN commerce.product
      ON commerce.product.id = commerce.cart_items.prod_id
      WHERE user_id = $1;`,
      [user_id]
    );
    if (cart_items.rows.length !== 0) {
      req.session.user!.cart = 1;
      res.send(cart_items.rows);
    } else {
      req.session.user!.cart = -1;
      res.send("your cart is empty");
    }
  } catch (err: any) {
    res.send(err);
  }
};
