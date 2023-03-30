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
    console.log(req.params.id);
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

export const checkoutCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user_id = req.params.id;
  // const { product_id, quantity, total } = req.body;

  //create a insert into order_details table
  const order_details_id = await db.getClient("CALL commerce.checkout($1);", 
    [user_id]);
    req.session.user!.cart = -1;
  //check for err
  //if err handle err.
  //if no error return order_details? as confirmation code and set req.session.cart = -1;
  res.send(order_details_id);
  //res with successful order and confirmation code
  } catch (err: any) {
    if (err.code === '23514') {
      console.log(err);
      return res.send('there is not enough inventory. Lower');
      //notify user that there is not enough inventory
      //as if they want to lower there quantity
      // or find a similar item. 
      //TODO need to find a way to figure out what item is throwing the error.
    }

    next(err);
  }
}