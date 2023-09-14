import express from 'express';
// @ts-ignore
import userController from '../controllers/userController.ts';
// @ts-ignore
import sessionController from "../controllers/sessionController.ts";
// @ts-ignore
import cookieController from '../controllers/cookieController.ts';

const router = express.Router();

// signup - POST '/'
router.post(
  '/signup',
  userController.createUser,
  sessionController.startSession,
  cookieController.setSSIDCookie,
  (_, res) => {
    return res.status(200).json(res.locals.user);
  }
);

// router.post('/login')
router.post(
  '/login',
  userController.verifyUser,
  sessionController.startSession,
  cookieController.setSSIDCookie,
  (_, res) => {
    return res.status(200).json(res.locals.user);
  }
);
// cookie parser
// bycrypt? jwt?

export default router;
