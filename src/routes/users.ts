import express = require('express');
const db = require('../db');
const userRouter = express.Router();


userRouter.get('/', async (req, res) => {
    try {
        const users = await db.query("SELECT (id, first_name, last_name, email_address, phone) FROM commerce.user LIMIT 50");
        if(users.rows.length === 0) {
            throw Error('Could not find users');
        }else {
            res.send(users.rows);
        }
    } 
    catch(err: any) {
        res.status(500).send(err.message)
    }
})


userRouter.get('/:id', async (req, res) => {
    try{
        const reqId = req.params.id;
        const user = await db.query('SELECT * FROM commerce.user WHERE id = $1', [reqId]);
        if(user.rows.length === 0) {
            throw Error('Could not find user');
        }
        if(req.session.authorized && req.session.user?.id == reqId) {
            res.send(user.rows[0]);
        }else {
            res.send('sorry you are not authorized to view this page');
        }
    }
    catch(err: any) {
        res.status(500).send(err.message);
    }
        
});


module.exports = userRouter;