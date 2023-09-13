import express, { Request, Response } from "express";
import userRouter from "./routes/userRouter";
import applicationRouter from "./routes/applicationRouter"
import path from 'path';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));


export const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../src')));

app.get('/api/test', (_, res: Response) => res.json({ greeting: 'janica is the worst' }));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

//app.use('/reminder', reminderRouter);
app.use('/user', userRouter);
app.use('/application', applicationRouter);

app.use((req: Request, res: Response) =>
  res.status(404).send("Page not found...")
);

app.use((err: Error, req: Request, res: Response) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errObj = Object.assign({}, defaultErr, err);
  console.log(errObj.log);
  return res.status(errObj.status).json(errObj.message);
});

if (!process.env['VITE']) {
  const frontendFiles = process.cwd() + '/dist';
  app.use(express.static(frontendFiles));
  app.get('/*', (_, res) => {
    res.send(frontendFiles + '/index.html');
  });
  app.listen(process.env['PORT']);
}