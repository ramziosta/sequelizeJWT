import express, {Express, Request, Response, NextFunction} from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import {connectToDatabase} from './config/database';
import syncDatabase from './models/sync';
import userRouter from './routes/userRoutes';
import postRouter from './routes/postRoutes';
import categoriesRouter from "./routes/categoriesRoutes";
import commentsRouter from "./routes/commentsRoutes";
//import { logger} from "./utils/logEvents";


const app: Express = express();
const PORT: number | string = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', userRouter);
app.use('/posts', postRouter);
app.use('/users', userRouter);
app.use('/comment', commentsRouter);
app.use('/category', categoriesRouter);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    console.log('Hello World');
    res.send('Hello World');
});

// Connect to database and sync models before starting the server
connectToDatabase()
    .then(() => syncDatabase())
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Error during initialization:', error);
        process.exit(1);
    });