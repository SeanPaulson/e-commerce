import { Request, Response } from "express";
const db = require("../db");

export const createCart = async (req: Request, res: Response) => {
  try {
    console.log(req.session);
    if (!req.session.user) {
      res.status(404).send("please login");
    }
//might not need to return cart_id...?
/**************get users cart_items **************/
    const cart = await db.query(
      "SELECT id, prod_id, quantity FROM commerce.cart_items WHERE user_id =$1",
      [req.session.user?.id]
    );
/*********************if user does not have a cart then create a new cart *******************/
    if (cart.rows.length === 0) {
      const newCart = await db.query(
        "INSERT INTO commerce.cart_items (user_id) VALUES ($1) RETURNING id, prod_id, quantity",
        [req.session.user?.id]
      );
      req.session.user!.cart = newCart.rows[0];
      return res.send(req.session);
    }
    
    req.session.user!.cart = cart.rows[0];
    res.send(req.session);
  } catch (err: any) {
    console.log("create cart: " + err);
    res.status(400).send(err);
  }
};
