const db = require("../db");
import { Response, Request } from "express";
import { updateUserProfile } from "../db/queries";
import { profileBodyReq } from "../types";

/**
 *gets all users (currently only gets 10) todo
 * @param req
 * @param res
 * @returns {[users]} || Error
 */
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await db.query(
      "SELECT id, first_name, last_name, email_address, phone FROM commerce.user LIMIT 50"
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
/**
 * gets a specific user by id
 * @param req
 * @param res
 */
export const getUser = async (req: Request, res: Response) => {
  try {
    const reqId = req.params.id
    const user = await db.query(
      "SELECT id, first_name, last_name, email_address, phone FROM commerce.user WHERE id = $1",
      [reqId]
    );
    if (user.rows.length === 0) {
      return res.status(204).send("Could not find user");
    } else {
      res.send(user.rows[0]);
    }
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};
/**
 * gets authed user profile information not including password.
 * @param req
 * @param res
 */
export const profileSettings = async (req: Request, res: Response) => {
  try {
    if (!req.session.user) {
      return res.status(402).send('please login');
    }
    const reqId = req.session.user.id;
    const user = await db.query(
      `SELECT 
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
      commerce.user_payment.provider,
      commerce.user_payment.account_number
      FROM commerce.user 
        JOIN commerce.user_address
            ON commerce.user.id = commerce.user_address.user_id
        JOIN commerce.user_payment
            ON commerce.user.id = commerce.user_payment.user_id
        WHERE commerce.user.id = $1;`,
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
/**
 * Updates authed user profile information not including password.
 * @param req
 * @param res
 */
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const user_id = req.session.user!.id;
    const profileInfo: profileBodyReq = req.body;
    console.log(profileInfo)
    const userField = Object.keys(profileInfo).map(async key => {
      let table;
      if(key === 'first_name' || key ===  "last_name" || key ===  "email_address" || key ===  "phone") {
        table = "user";
        const updatedProfile = await db.getClient(updateUserProfile(key, table), [
                profileInfo[key],
                user_id,
              ]);
              return updatedProfile
      } else if (key === "expires" || key === "provider" || key === "account_number") {
        table = "user_payment";
        const updatedProfile = await db.getClient(updateUserProfile(key, table), [
                profileInfo[key],
                user_id,
              ]);
              console.log(updatedProfile)
              return updatedProfile
      } else {
        table = "user_address";
        const updatedProfile = await db.getClient(updateUserProfile(key, table), [
                profileInfo[key],
                user_id,
              ]);
              return updatedProfile
      }
    })

  res.sendStatus(200);

   
  } catch (err: any) {
    res.send(err.message + err);
  }
};

/**
 * Deletes user;
 * @param req
 * @param res
 * TODO: need to add a confirm delete popup.
 */
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user_id = req.params.id;
    const isDeleted = await db.getClient(
      "DELETE FROM commerce.user CASCADE WHERE id = $1 RETURNING *",
      [user_id]
    );
    res.send("deleted user");
  } catch (err: any) {
    console.log("cannot delete user");
    res.send(err);
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const user_id = req.session.user?.id
    const orders = await db.query(
      "SELECT id, user_id, total FROM commerce.order_details WHERE user_id = $1",
      [user_id]
    );
    if (orders.rows !== 0) {
      return res.send(orders.rows);
    }
    
    return res.send("no orders found");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    //TODO should probably change id from params to body
    const orderID = req.params.orderID;
    const orders = await db.query(
      "SELECT * FROM commerce.order_items WHERE order_id = $1",
      [orderID]
    );
    if (orders.rows == 0) {
      return res.status(404).send("no orders found");
    }
    res.send(orders.rows);
  } catch (err) {
    res.send(err);
  }
};
