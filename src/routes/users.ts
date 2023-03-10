import express = require('express');
const db = require('../db');
const userRouter = express.Router();



userRouter.get('/:id', async (req, res) => {
    try{
        console.log('users: ');
        console.log(req.session);
        const reqId = req.params.id;
        const result = await db.query('SELECT * FROM commerce.user WHERE id = $1', [reqId]);
        if(result.rows.length === 0) {
            throw Error('Could not find user');
        }
        if(req.session.authorized && req.session.user?.id == reqId) {
            res.send('you have been authorized!');
        }else {
            res.send('sorry you are not authorized to view this page');
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