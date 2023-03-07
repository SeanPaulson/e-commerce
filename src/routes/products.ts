import express = require('express');
const db = require ('../db');
const productRouter = express.Router();


productRouter.get('/', async (req, res, next) => {
    try{
        const result = await db.query('SELECT * FROM commerce.product LIMIT 10');
        res.send(result.rows);
    }
    catch(err: any) {
        res.status(500).send(err.message);
    }
    
        res.end();
});



module.exports = productRouter