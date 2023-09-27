import { Response, NextFunction } from 'express';

const cookieController = {
  // set cookie
  async setSSIDCookie(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    console.log('entering setSSIDCookie middleware', res.locals.user);
    // set cookie called ssid to user id after user has been authenticated
    // check if user id exists, if not call global error handler
    try {
      if (!res.locals._id) {
        return next({
          log: 'error in cookieController.setSSIDCookie',
          message: {
            err: 'Error user id undefined',
          },
        });
      }
      const { _id } = res.locals.user;
      res.cookie('ssid', _id, {
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
    req: Request,
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
