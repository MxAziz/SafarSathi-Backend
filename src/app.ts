import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import notFound from './middlewares/notFound';
// import globalErrorHandler from './middlewares/globalErrorHandler';

const app: Application = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req: Request, res: Response) => {
    res.send({
        Message: "SafarSathi Backend is running successfully",
        uptime: process.uptime().toFixed(2) + " seconds",
        timestamp: new Date().toISOString()
    })
});


// app.use(globalErrorHandler);

app.use(notFound);

export default app;