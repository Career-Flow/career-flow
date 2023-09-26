import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// @ts-ignore
import userRouter from "./routes/userRouter.ts";
// @ts-ignore
import applicationRouter from "./routes/applicationRouter.ts";
// @ts-ignore
import db from "./models/db.js";
export const app = express();
app.use(cors());

app.use(express.json());
app.use(cookieParser());

//app.use('/reminder', reminderRouter);
// app.use("/signup", userRouter, (req, _) => {
//   console.log("user", req.body);
// });

app.post("/user", userRouter, (req) => console.log(req.body));
// app.use("/application", applicationRouter, (_, res) => {
//   return res.json("query sent through to database");
// });

app.use((_: Request, res: Response) =>
  res.status(404).send("Page not found...")
);

app.use((err: Error, _: Request, res: Response) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errObj = Object.assign({}, defaultErr, err);
  console.log(errObj.log);
  return res.status(errObj.status).json(errObj.message);
});

app.listen(3000, () => console.log("connected to the server"));

// if (!process.env['VITE']) {
//   const frontendFiles = process.cwd() + '/dist';
//   app.use(express.static(frontendFiles));
//   app.get('/*', (_, res) => {
//     res.send(frontendFiles + '/index.html');
//   });
//   app.listen(process.env['PORT']);
// }
