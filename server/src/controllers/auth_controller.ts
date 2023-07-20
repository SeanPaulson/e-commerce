import { NextFunction, Request, Response } from "express";
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
    if (data.rows.length === 0) {
      return res.status(401).send('email or password is incorrect: redirect to login comming soon');
    }
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

export const register = async (req: Request, res: Response) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      phone,
      address_line1,
      address_line2,
      city,
      zip_code,
      country_code,
      expires,
      provider,
      account_number,
    } = req.body;
    //Check if user already exists
    const user = await db.query(
      "SELECT * FROM commerce.user WHERE email_address = $1",
      [email]
    );
    if (user.rows.length !== 0) {
      return res
        .status(401)
        .send(
          "A user with this email already exists (forgot password functionality comming soon)"
        );
    }
    //Salt and hash password and create new user
    const saltRounds = 10;
    const bcryptPassword = await bcrypt.hash(password, saltRounds);
    const data = await db.getClient(
      "INSERT INTO commerce.user (first_name, last_name, password, email_address, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [firstName, lastName, bcryptPassword, email, phone]
    );

    if (data.rows.length !== 0) {
      const user_id = data.rows[0].id;
      const addressData = await db.getClient(
        "INSERT INTO commerce.user_address (user_id, address_line1, address_line2, city, zip_code, country_code) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [user_id, address_line1, address_line2, city, zip_code, country_code]
      );
      const paymentData = await db.getClient(
        "INSERT INTO commerce.user_payment (user_id, expires, provider, account_number) VALUES ($1, $2, $3, $4) RETURNING *",
        [user_id, expires, provider, account_number]
      );
      const newUser = data.rows[0];
      //create user req.session and redirect to homepage
      req.session.user = {
        id: newUser.id,
        firstName: newUser.first_name,
        lastName: newUser.last_name,
        email: newUser.email_address,
        phone: newUser.phone,
      };

      req.session.authorized = true;
      res.status(200).send("logged in!");
    } else if (data.rows.length === 0) {
      throw Error("something went wrong");
    }
  } catch (err: any) {
    console.log("catch: " + err.message);
    res.status(404).send(err.message);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    req.session.destroy((e) => {
      if (e) {
        throw e;
      } else {
        res.redirect("/");
      }
    });
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};
