import express, { Request, Response } from "express";
import userRouter from "./routes/userRouter.ts";
import applicationRouter from "./routes/applicationRouter.ts"

export const app = express();

app.use(express.json());

app.get('/api/test', (_, res: Response) => res.json({ greeting: 'jordan is the worst!' }));

//app.use('/reminder', reminderRouter);
app.use('/user', userRouter);
app.use('/application', applicationRouter);


app.use((_: Request, res: Response) =>
  res.status(404).send("Page not found...")
);

app.use((err: Error, _: Request, res: Response) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errObj = Object.assign({}, defaultErr, err);
  console.log(errObj.log);
  return res.status(errObj.status).json(errObj.message);
});

app.listen(3000);

// if (!process.env['VITE']) {
//   const frontendFiles = process.cwd() + '/dist';
//   app.use(express.static(frontendFiles));
//   app.get('/*', (_, res) => {
//     res.send(frontendFiles + '/index.html');
//   });
//   app.listen(process.env['PORT']);
// }

