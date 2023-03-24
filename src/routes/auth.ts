const router = require("express").Router();
import { login, logout, register } from "../controllers/auth_controller";
import { Request, Response } from "express";
import { getUserCart } from "../controllers/cart_controller";

router.post("/register", register, getUserCart);
router.get('/login', (req: Request, res: Response) => {
  res.send('login page');
});
router.post('/login', login, getUserCart);
router.get('/logout', logout);

module.exports = router;


