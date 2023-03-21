import { NextFunction, Request, Response } from "express";
const db = require("../db");

//create cart
export const addItemToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {prod_id, quantity} = req.body;
    const user_id = req.session.user?.id;
    const newCart = await db.query(
      "INSERT INTO commerce.cart_items (prod_id, quantity, user_id) VALUES ($1, $2, $3) RETURNING *",
      [prod_id, quantity, user_id]
    );
    if (newCart.rows.length === 0) {
      throw Error('could not update')
    } else {
      req.session.user!.cart = 1;
      res.send(newCart.rows[0]);
    }
  } catch (err: any) {
    return err.message
  }
};
//get cart items
/**
 *I dont like this get user cart should not also update user cart.
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
    console.log("getUserCart");
    const user_id = req.session.user?.id;
    const cart_items = await db.query(
      "SELECT prod_id FROM commerce.cart_items WHERE user_id = $1",
      [user_id]
    );
    if (cart_items.rows.length !== 0) {
      req.session.user!.cart = 1;
      res.send(cart_items.rows[0]);
    } else { 
      req.session.user!.cart = -1
      res.send('your cart is empty')
    }
  } catch (err: any) {
    res.send(err);
  }
};
//add new cart item

//update cart quantity
/**
 *
 * @param cart_items @type { rows: [] }
 * @param prod_id @type Number
 * @param quantity @type Number
 */
export const updateUserCart = async (
  cart_items: { rows: [] },
  prod_id: Number,
  quantity: Number
) => {
  try {
    cart_items.rows.forEach(async (item: { prod_id: Number }) => {
      if ((item.prod_id = prod_id)) {
        const updatedCart = await db.query(
          "UPDATE commerce.cart_items SET quantity = quantity + $1 WHERE prod_id = $2 RETURNING *",
          [quantity, prod_id]
        );
        console.log(updatedCart.rows[0]);
      }
    });
  } catch (err: any) {}
};
