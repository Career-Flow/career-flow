import express, { Response } from 'express';
import userController from '../controllers/userController.ts';
// import sessionController from "../controllers/sessionController.ts";
// import cookieController from '../controllers/cookieController.ts';

const userRouter = express.Router();

// signup - POST '/'
userRouter.post(
  '/signup',
  userController.createUser,
  // cookieController.setSSIDCookie,
  (_, res: Response) => res.status(201).json(res.locals.user),
);

// router.post('/login')
userRouter.post(
  '/login',
  userController.verifyUser,
  // cookieController.setSSIDCookie,
  (_, res: Response) => res.status(200).json(res.locals.user),
);
// cookie parser
// bycrypt? jwt?

export default userRouter;
