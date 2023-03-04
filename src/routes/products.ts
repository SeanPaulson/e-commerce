import express = require('express');
const db = require ('../db');
const productRouter = express.Router();


productRouter.get('/', (req, res, next) => {
    db.query('SELECT * FROM commerce.product LIMIT 10', (err: any, result: any, cb: any) =>{
        if (err) {
            return next(err)
        }
        res.send(result.rows);
    })
});



module.exports = productRouter