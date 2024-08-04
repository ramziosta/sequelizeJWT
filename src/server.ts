import express, {Express, Request, Response, NextFunction} from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
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
app.use(cors({
    origin:'localhost:3000',
    credentials:true
}))
;
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/', userRouter); // Mount userRouter at the root path
app.use('/posts', postRouter); // Mount postRouter at '/posts'
app.use('/users', userRouter); // Mount userRouter at '/users'
app.use('/comment', commentsRouter); // Mount commentsRouter at '/comment'
app.use('/category', categoriesRouter); // Mount categoriesRouter at '/category'
app.use('/login', userRouter); // Mount userRouter at '/login'
app.use('/logout', userRouter); // Mount userRouter at '/logout'

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    console.log('Hello World');
    res.send('Hello World');
});

//cookies
app.get('/set-cookies', (req: Request, res: Response, next: NextFunction) => {
    res.cookie('newUser', false);
    res.cookie('isEmployee', true, {maxAge: 1000 * 60 * 60 * 24,});
    res.send('You got the cookies!');
});
app.get('/read-cookies', (req: Request, res: Response, next: NextFunction) => {
    const cookies = req.cookies;
    console.log(cookies.newUser);

    res.json(cookies);
});
app.get('/test-cookie', (req: Request, res: Response) => {
    // Set a cookie
    res.cookie('test', 'cookieValue', {httpOnly: true, maxAge: 3600000});

    // Send response including the cookies sent with the request
    res.json({
        message: 'Cookie set',
        cookies: req.cookies
    });
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