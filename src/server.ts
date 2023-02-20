import express, {Express, Request, Response} from 'express';
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app: Express = express();
const port = process.env.PORT || 3001;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello cunt');
});



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});