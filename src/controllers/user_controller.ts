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
    const reqId = req.params.id;
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
    const reqId = req.params.id;
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
      commerce.user_payment.provider
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
    const user_id = req.params.id;
    const profileInfo: profileBodyReq = req.body;
    const userField = Object.keys(profileInfo)[0];
    let updatedProfile;
    console.log(userField);
    switch (userField) {
      case "first_name" || "last_name" || "email_address" || "phone":
        const t1 = "user";
        updatedProfile = await db.getClient(updateUserProfile(userField, t1), [
          profileInfo[userField],
          user_id,
        ]);
        break;
      case "expires" || "provider":
        const t2 = "user_payment";
        updatedProfile = await db.getClient(updateUserProfile(userField, t2), [
          profileInfo[userField],
          user_id,
        ]);
        break;
      default:
        const t3 = "user_address";
        updatedProfile = await db.getClient(updateUserProfile(userField, t3), [
          profileInfo[userField],
          user_id,
        ]);
        break;
    }
    if (updatedProfile.rowCount > 0) {
      res.send(updatedProfile);
    }
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
    console.log(isDeleted.rowCount);
    res.send("deleted user");
  } catch (err: any) {
    console.log("cannot delete user");
    res.send(err);
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const user_id = req.params.id;
    const orders = await db.query(
      "SELECT id, user_id, total FROM commerce.order_details WHERE user_id = $1",
      [user_id]
    );
    if (orders.rows == 0) {
      return res.send("no orders found");
    }
    res.send(orders.rows);
  } catch (err) {
    res.send(err);
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const orderID = req.params.orderID;
    const orders = await db.query(
      "SELECT * FROM commerce.order_items WHERE id = $1",
      [orderID]
    );
    if (orders.rows == 0) {
      return res.send("no orders found");
    }
    res.send(orders.rows);
  } catch (err) {
    res.send(err);
  }
};
