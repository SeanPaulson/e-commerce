const db = require("../db");
import { Response, Request } from "express";

/**
 *
 * @param req
 * @param res
 * @returns {[users]} || Error
 */
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await db.query(
      "SELECT (id, first_name, last_name, email_address, phone) FROM commerce.user LIMIT 50"
    );
    if (users.rows.length === 0) {
      throw Error("Could not find users");
    } else {
      res.send(users.rows);
    }
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const reqId = req.params.id;
    const user = await db.query(
      "SELECT (id, first_name, last_name, email_address, phone) FROM commerce.user WHERE id = $1",
      [reqId]
    );
    if (user.rows.length === 0) {
      res.send("Could not find user");
    } else {
      res.send(user.rows[0]);
    }
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};

export const profileSettings = async (req: Request, res: Response) => {
  try {
    const reqId = req.params.id;
    const user = await db.query(`SELECT 
        commerce.user.id, 
        commerce.user.first_name, 
        commerce.user.last_name,
        commerce.user.email_address,
        commerce.user.phone,
        commerce.user_address.address_line1,
        commerce.user_address.address_line2,
        commerce.user_address.city,
        commerce.user_address.zip_code,
        commerce.user_address.country_code,
        commerce.user_payment.expires,
        commerce.user_payment.provider
        FROM commerce.user 
        JOIN commerce.user_address
            ON commerce.user.id = commerce.user_address.user_id
        JOIN commerce.user_payment
            ON commerce.user.id = commerce.user_payment.user_id
        WHERE commerce.user.id = $1;`, [
        reqId,
        ]);
    if (user.rows.length === 0) {
        res.send('Could not find user');
    } else {
        res.send(user.rows[0]);
    }
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};
