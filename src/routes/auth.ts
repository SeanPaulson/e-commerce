const router = require("express").Router();
import { login } from "../controllers/auth_controller";
import { NextFunction, Request, Response } from "express";
import { getUserCart } from "../controllers/cart_controller";
const db = require("../db");
const bcrypt = require("bcrypt");

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;
    //Check if user already exists
    const user = await db.query(
      "SELECT * FROM commerce.user WHERE email_address = $1",
      [email]
    );
    if (user.rows.length !== 0) {
      return res.status(401).send("A user with this email already exists (forgot password functionality comming soon)");
    }
    //Salt and hash password and create new user
    const saltRounds = 10;
    const bcryptPassword = await bcrypt.hash(password, saltRounds);
    const data = await db.getClient(
                    "INSERT INTO commerce.user (first_name, last_name, password, email_address, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                    [firstName, lastName, bcryptPassword, email, phone]
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
    res.status(200).send('logged in!');
    
  } catch (err: any) {
    console.log('catch: ' + err.message);
    res.status(404).send(err.message);
  }
});

router.get('/login', (req: Request, res: Response) => {
  res.send('login page');
});

router.post('/login', login, getUserCart);

router.get('/logout', async (req: Request, res: Response) => {
  try {
    req.session.destroy((e) => 
    {
      if (e){
        throw(e);
      } else {
        res.redirect('/');
      }
    });
    
} catch (err) {
    console.error(err)
    return res.sendStatus(500)
}
});



module.exports = router;


