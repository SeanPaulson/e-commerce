import { NextFunction, Request, Response } from "express";
import { getUserCart } from "../controllers/cart_controller";
const db = require("../db");
const bcrypt = require("bcrypt");

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    //get user password/ from matching email.
    const data = await db.query(
      "SELECT * FROM commerce.user WHERE email_address = $1",
      [email]
    );
    const user = data.rows[0];

    //compare user password
    const matches = bcrypt.compareSync(password, user.password);
    if (!matches) {
      return res.status(403).send("email or password is incorrect");
    }
    req.session.authorized = true;
    req.session.user = {
      id: user.id,
    };
    next();
  } catch (err: any) {
    console.log("/login" + err.message);
    res.status(404).send(err.message);
  }
};
