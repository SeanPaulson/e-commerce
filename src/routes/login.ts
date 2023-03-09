const router = require("express").Router();
import { Request, Response } from "express";
const db = require("../db");
const bcrypt = require("bcrypt");

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;
    const user = await db.query(
      "SELECT * FROM commerce.user WHERE email_address = $1",
      [email]
    );
    if (user.rows.length !== 0) {
      return res.status(401).send("A user with this email already exists");
    }

    const saltRounds = 10;
    const bcryptPassword = await bcrypt.hash(password, saltRounds);
    const result = await db.getClient(
                    "INSERT INTO commerce.user (first_name, last_name, password, email_address, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                    [firstName, lastName, bcryptPassword, email, phone]
                );
    console.log(result)
    return res.send(user.rows[0]);
  } catch (err: any) {
    console.log(err.message);
    res.send(err.message).status(500);
  }
});

module.exports = router;


// bcrypt.hash(password, saltRounds)
//     .then(async (hash: String) => {
//       const result = await db.getClient(
//         "INSERT INTO commerce.user (first_name, last_name, password, email_address, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *",
//         [firstName, lastName, password, email, phone]
//        );
//     });