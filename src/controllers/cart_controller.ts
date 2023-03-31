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




//TODO DELETE CART ITEMS
export const deleteCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id = req.params.id;
    const item_id = req.body.cart_item;
    const result = await db.query("DELETE FROM commerce.cart_items WHERE user_id = $1 AND prod_id = $2",
    [user_id, item_id]);
    if (result.rowCount != 1) {
      throw Error('cart is empty');
    }
    console.log(result);
    res.send(result);
  }
  catch (err) {
    res.send(err);
  }
}



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
      return res.send('there is not enough inventory on item: ' + Number(err.column) + '. Lower quantity selected');
      //TODO need to find a better way to handle this error. for example show similar items or show how many items are left.
    }

    next(err);
  }
}