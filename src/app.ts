import express, {Express, NextFunction, Request, Response} from 'express';
const productsRouter = require('./routes/products');
const db = require('./db')
const cors = require('cors');
const expressSession = require("express-session");
const pgSession = require("connect-pg-simple")(expressSession);
const compression = require('compression');
const authRouter = require('./routes/auth');

if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const app: Express = express();
const port = process.env.PORT || 3001;

app.set('trust proxy', 1)
app.use(express.json());
app.use(cors());
app.use(compression());
app.use(expressSession({
    store: new pgSession({
        pool: db.pool,
        tableName: "shopping_session",
        schemaName: "commerce"
    }),
    secret: process.env.SECRET,
    cookie: { maxAge: 1000 * 60 * 30, sameSite: "none"},
    resave: false,
    saveUninitialized: false,
    secure: process.env.NODE_ENV === "production",
}))
app.use('/product', productsRouter);
app.use('/auth', authRouter);
app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
    console.log('err:' + err);
    next();
})




app.get('/', (req: Request, res: Response, next) => {
    res.send('home page' + req.session);
});




app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});