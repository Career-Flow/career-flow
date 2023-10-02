import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import db from '../models/db.ts';

const sessionController = {
  // start session
  // startSession: async function (req: Request, res: Response, next: NextFunction) {
  //     console.log('entering sessionController middleware', res.locals.users)
  //     try {
  //     if(!res.locals.user) return next({
  //         status: 400,
  //         message: 'error in sessionSession.startSession'
  //     });
  //     const { _id } = res.locals.user;
  //     const createQuery = `INSERT INTO sessions (cookie_id, user_id) VALUES ($1,$1) RETURNING *;`;
  //     const result = await db.query(createQuery, [_id]);
  //     // console.log(result.rows[0]);
  //     res.locals._id = result.rows[0];
  //     console.log('reached the end of startSession middleware', res.locals._id)
  //     return next();
  // } catch (err) {
  //     return next({
  //         status: 400,
  //         message: 'error in sessionSession.startSession'
  //     });
  // }
  // },
  // end session
  // endSession: async function (req: Request, res: Response, next: NextFunction) {

  // },
  // isLoggedIn
  async isLoggedIn(req: Request, res: Response, next: NextFunction) {
    // if (req.cookies.SSID === undefined) {
    //   return next({
    //     status: 403,
    //     message: 'You are not logged in.',
    //   });
    // }

    try {
      const token = req.cookies.ssid;
      console.log('token on sessionCon', token);
      if (!process.env.TOKEN_KEY) {
        throw new Error('TOKEN_KEY environment variable is not defined');
      }
      const decoded = jwt.verify(token, process.env.TOKEN_KEY) as JwtPayload;
      console.log(decoded.email);
      const createQuery = `
      SELECT *
      FROM users
      WHERE email=$1`;
      const result = await db.query(createQuery, [decoded.email]);
      if (!result.rows[0]) { throw new Error('User not found in db based on JWT'); }
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { _id } = result.rows[0];
      res.locals.userId = _id;
      console.log(res.locals.userId);
      return next();
    } catch (err) {
      return next({
        log: `error in sessionController.isLoggedIn: ${err}`,
        message: {
          err: `Error user not logged in: ${err}`,
        },
      });
    }
  },

};

export default sessionController;
