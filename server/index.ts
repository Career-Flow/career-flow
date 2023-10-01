import express, { Request, Response } from 'express'; // { Response }
import cookieParser from 'cookie-parser';
import ViteExpress from 'vite-express';
import cors from 'cors';
import userRouter from './routes/userRouter.ts';
import applicationRouter from './routes/applicationRouter.ts';
// import db from "./models/db.js";

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors<Request>());

app.use('/login', userRouter);
// app.use("/signup", userRouter);
// app.use('/reminder', reminderRouter);

// app.use("/login", userRouter, (req, _) => {
//   console.log("user", req.body);
// });

// app.use("/signup", (req, _) => {
//   console.log("user", req.body);
// });

app.use('/api', applicationRouter);

// app.use((_: Request, res: Response) =>
//   res.status(404).send("Page not found...")
// );

app.use((err: Error, _: Request, res: Response) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errObj = { ...defaultErr, ...err };
  console.log(errObj.log);
  return res.status(errObj.status).json(errObj.message);
});

ViteExpress.listen(app, PORT, () => console.log(`Server is listening...PORT: ${PORT}`));
// if (!process.env['VITE']) {
//   const frontendFiles = process.cwd() + '/dist';
//   app.use(express.static(frontendFiles));
//   app.get('/*', (_, res) => {
//     res.send(frontendFiles + '/index.html');
//   });
//   app.listen(process.env['PORT']);
// }
