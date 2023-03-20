import express, {Express, NextFunction, Request, Response} from 'express';
const productsRouter = require('./routes/products');
const db = require('./db')
const cors = require('cors');
const expressSession = require("express-session");
const pgSession = require("connect-pg-simple")(expressSession);
const compression = require('compression');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
import cartRouter from "./routes/shopping_cart";
import {createCart} from './controllers/cart_controller';
import {isAuthorized} from './utils/auth';

if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const app: Express = express();
const port = process.env.PORT || 3001;

// app.use express.favicon()
app.set('trust proxy', 1)
app.use(express.json());
app.use(cors({
    origin: 'localhost:3001',  //Your Client, do not write '*'
    credentials: true,
}));
app.use(compression());
app.use(expressSession({
    store: new pgSession({
        pool: db.pool,
        tableName: "shopping_session",
        schemaName: "commerce",
        createTableIfMissing: true
    }),
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {secure: false, maxAge: 1000 * 60 * 60 * 24, sameSite: 'none', httpOnly: 'true'},
}));

app.get('/', (req: Request, res: Response, next) => {
    res.send('home page- session: ' + req.session);
});
app.use('/auth', authRouter);
app.use('/product', productsRouter);
app.use('/users', userRouter);
app.use('/cart',isAuthorized, cartRouter);
app.use((req:Request, res: Response, next) => {
    console.log(req.url)
    res.status(404).redirect('back');
});


app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
    console.log('err:' + err);
    next();
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});