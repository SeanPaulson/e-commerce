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
        
});

productRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await db.query("SELECT * FROM commerce.product WHERE product.id = $1", [id]);

        if(result.rows.length === 0) {
            throw Error('Could not find product');
        }
        
        res.send(result.rows);
    }catch (err: any) {
        res.status(404).send('err: ' + err.message);
    }
});


productRouter.get('/:categoryId', async (req, res) => {
    const category_id = req.params.categoryId;
    try {
        const result = await db.query("SELECT * FROM commerce.product WHERE product.category_id = $1", [category_id]);

        if(result.rows.length === 0) {
            throw Error('Could not find product category');
        }
        
        res.send(result.rows);
    }catch (err: any) {
        res.status(404).send('err: ' + err.message);
    }
});


module.exports = productRouter;