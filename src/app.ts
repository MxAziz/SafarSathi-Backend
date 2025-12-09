// import express, { Application, NextFunction, Request, Response } from 'express';
// import cors from 'cors';
// import notFound from './middlewares/notFound';
// // import globalErrorHandler from './middlewares/globalErrorHandler';

// const app: Application = express();
// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true
// }));

// //parser
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// app.get('/', (req: Request, res: Response) => {
//     res.send({
//         Message: "SafarSathi Backend is running successfully",
//         uptime: process.uptime().toFixed(2) + " seconds",
//         timestamp: new Date().toISOString()
//     })
// });


// // app.use(globalErrorHandler);

// app.use(notFound);

// export default app;


import cors from "cors";
import express, { Request, Response } from "express";
import config from "./config";
import routes from "./routes/routes";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// routes
app.use("/api/v1", routes);

app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "Welcome to SafarSashi Server",
    environment: config.node_env,
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;