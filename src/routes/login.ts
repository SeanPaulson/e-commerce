const router = require('express').Router();
import { Request, Response } from "express";
const db = require('../db')

router.post('/register', async (req: Request, res: Response) => {
    try{
        const {email, password} = req.body;
        const user = await db.query("SELECT * FROM commerce.user WHERE email_address = $1", [email]);
        console.log(user.rows[0]);
        return res.send(user.rows[0]);
    }
    catch(err: any) {
        console.log(err.message);
        res.send(err.message).status(500);
    }
})



module.exports = router;