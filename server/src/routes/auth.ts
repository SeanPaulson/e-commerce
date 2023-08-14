const router = require("express").Router();
import { login, logout, register } from "../controllers/auth_controller";
import { Request, Response } from "express";

router.post("/register", register);
router.get('/login', (req: Request, res: Response) => {
  res.send('login page');
});
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;


