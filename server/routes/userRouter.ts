import express from 'express';
// @ts-ignore
import userController from '../controllers/userController.ts';
// import sessionController from "../controllers/sessionController.ts";
// @ts-ignore
// import cookieController from '../controllers/cookieController.ts';

const router = express.Router();

// signup - POST '/'
router.post(
  '/signup',
  userController.createUser,
  // cookieController.setSSIDCookie,
  (_, res) => {
    return res.status(201).json(res.locals.user);
  }
);

// router.post('/login')
router.post(
  '/login',
  userController.verifyUser,
  // cookieController.setSSIDCookie,
  (_, res) => {
    return res.status(200).json(res.locals.user);
  }
);
// cookie parser
// bycrypt? jwt?

export default router;
