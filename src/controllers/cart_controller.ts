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
      "SELECT * FROM commerce.get_user_cart($1);",
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

export const checkoutCart = async (req: Request, res: Response) => {
  try {
    const user_id = req.params.id;
  // const { product_id, quantity, total } = req.body;

  //create a insert into order_details table
  const order_details_id = await db.getClient("CALL commerce.checkout($1);", 
    [user_id]);
  //check for err
  //if err handle err.
  
  //if no error return order_details? as confirmation code and set req.session.cart = -1;
  if (order_details_id.rows) {
    return res.send(order_details_id);
  }
  res.send(order_details_id);
  //res with successful order and confirmation code
  }catch (err: any) {
    res.send(err);
  }
}