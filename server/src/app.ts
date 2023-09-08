import express, {Express, NextFunction, Request, Response, urlencoded} from 'express';
const productsRouter = require('./routes/products');
const db = require('./db')
const cors = require('cors');
const timeout = require('connect-timeout');
const expressSession = require("express-session");
const swaggerJsdoc = require('swagger-jsdoc');
const pgSession = require("connect-pg-simple")(expressSession);
const compression = require('compression');
const swaggerUi = require('swagger-ui-express');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
import cartRouter from "./routes/shopping_cart";
const morgan = require('morgan');

// const openapiSpecification = require('../Design/api_doc');

if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const app: Express = express();
const port = process.env.PORT || 3001;


// app.use express.favicon()
app.use(express.json());
app.use(urlencoded({ extended: true}))
app.use(express.static(__dirname + '../Design'));
app.set('trust proxy', 1)
app.use(express.json());
app.use(timeout('20s'));
app.use(morgan('dev'));
app.use(cors({
    origin: ['https://e-commerce-site-4e1r.onrender.com', 'localhost:3001'],  //Your Client, do not write '*'
    credentials: true,
}));
app.use(compression());
app.use(expressSession({
    store: new pgSession({
        pool: db.pool,
        tableName: "shopping_session",
        schemaName: "commerce",
        createTableIfMissing: true,
    }),
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {secure: true, maxAge: 1000 * 60 * 60 * 24, sameSite: 'none', httpOnly: 'true'},
}));
const openAPIoptions = {
    failOnErrors: true,
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Hello World',
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://localhost:3001',
          description: 'Development server',
          
        },
        ],
        tags: [
            {
                name: "users",
                description: "Everything about users/customers",
            },
            {
                products: "products",
                description: "information about available products",
            },
            {
                cart: "cart",
                description: "user cart information",
            }
        ]
    },
    apis: ['./dist/src/swagger_docs/*.yaml'], // files containing annotations as above
  };

const openapiSpecification = swaggerJsdoc(openAPIoptions);
app.use('/api-docs', swaggerUi.serve)
app.get('/api-docs',  swaggerUi.setup(openapiSpecification))


app.use('/auth', authRouter);
app.use('/product', productsRouter);
app.use('/users', userRouter);
app.use('/cart', cartRouter);


app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
    console.log( err);
    res.end();
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});