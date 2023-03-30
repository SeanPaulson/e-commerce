import { NextFunction, Response, Request } from "express";

const productRouter = require('express').Router();;
const db = require ('../db');


productRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const result = await db.query('SELECT * FROM commerce.product LIMIT 10');
        console.log('/product: ');
        console.log(req.session);
        res.send(result.rows);
    }
    catch(err: any) {
        res.status(500).send(err.message);
    }
        
});

productRouter.get('/:id', async (req: Request, res: Response) => {
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


productRouter.get('/:categoryId', async (req: Request, res: Response) => {
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