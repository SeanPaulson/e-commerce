import express, {Express, Request, Response} from 'express';
const productsRouter = require('./routes/products');
const db = require('./db')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app: Express = express();
const port = process.env.PORT || 3001;

app.use('/product', productsRouter);


app.get('/', (req: Request, res: Response, next) => {
    db.query('SELECT * FROM commerce.user WHERE id = 201', (err: any, result: any) => {
        if (err) {
            return next(err)
        }
        res.send(result.rows[0])
    })
});




app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});