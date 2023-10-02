import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const cookieController = {
  // set cookie
  async setSSIDCookie(
    _: Request,
    res: Response,
    next: NextFunction,
  ) {
    console.log('entering setSSIDCookie middleware', res.locals.user);
    // set cookie called ssid to user id after user has been authenticated
    // check if user id exists, if not call global error handler
    try {
      if (!res.locals.user) {
        return next({
          log: 'error in cookieController.setSSIDCookie',
          message: {
            err: 'Error user undefined',
          },
        });
      }
      const { email } = res.locals.user;
      // for typescript edge case coverage when TOKEN_KEY is null
      if (!process.env.TOKEN_KEY) {
        throw new Error('TOKEN_KEY environment variable is not defined');
      }
      // creating JWT
      const token = jwt.sign(
        { email },
        process.env.TOKEN_KEY,
        {
          expiresIn: '2h',
        },
      );
      // passing JWT as cookie data
      res.cookie('ssid', token, {
        maxAge: 1000 * 60 * 60 * 2, // 2 hours
        httpOnly: true,
      });
      console.log('reached the end of setSSIDCookie');
      return next();
    } catch (err) {
      return next({
        log: 'error in cookieController.setSSIDCookie',
        message: {
          err: 'Error user id undefined',
        },
      });
    }
  },
  // delete cookie
  async deleteSSIDCookie(
    _: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      res.clearCookie('ssid');
      return next();
    } catch {
      return next({
        log: 'error in cookieController.deleteSSIDCookie',
        message: {
          err: 'Error trying to delete SSID cookie',
        },
      });
    }
  },
};

export default cookieController;
