import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

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
  isLoggedIn(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.ssid;
      if (!process.env.TOKEN_KEY) {
        throw new Error('TOKEN_KEY environment variable is not defined');
      }
      const decoded = jwt.verify(token, process.env.TOKEN_KEY) as JwtPayload;
      // grabbing the _id thats also stored in the jwt
      res.locals.userId = decoded.id;
      console.log('in sessioncontroller userid', res.locals.userId);
      return next();
    } catch (err) {
      // if jwt.verify fails, the catch triggers
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
