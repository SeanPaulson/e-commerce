import express = require('express');
const db = require('../db');
const userRouter = express.Router();



userRouter.get('/:id', async (req, res) => {
    try{
        console.log('users: ');
        console.log(req.session.user);
        const reqId = req.params.id;
        const result = await db.query('SELECT * FROM commerce.user WHERE id = $1', [reqId]);
        if(result.rows.length === 0) {
            throw Error('Could not find user');
        }
        if(req.session.authorized && req.session.user?.id === reqId) {
            res.send(result.rows[0]);
        }else {
            const {id, first_name, last_name, email_address, phone} = result.rows[0];
            const user = {id, first_name, last_name, email_address, phone}
            res.send(user);
        }
    }
    catch(err: any) {
        res.status(500).send(err.message);
    }
        
});


// /:id/settings
//if user === authenticated and req.params.id === req.session.user.id
//return all info so user can edit his homepage


module.exports = userRouter;