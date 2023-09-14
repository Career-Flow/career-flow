import { Response, NextFunction } from 'express';

const cookieController = {
  // set cookie
  setSSIDCookie: async function (
    _: any,
    res: Response,
    next: NextFunction
  ) {
    console.log('entering setSSIDCookie middleware', res.locals.user);
    // set cookie called ssid to user id after user has been authenticated
    // check if user id exists, if not call global error handler
    try {
      if (!res.locals.user)
        return next({
          log: 'error in cookieController.setSSIDCookie',
          message: {
            err: `Error user id undefined`,
          },
      });
      const { cookie } = res.locals.user;
      res.cookie('ssid', cookie, {
        httpOnly: true,
      });
      console.log('reached the end of setSSIDCookie');
      return next();
    } catch (err) {
      return next({
        log: 'error in cookieController.setSSIDCookie',
        message: {
          err: `Error user id undefined`,
        },
      });
    }
  },
  // delete cookie
  deleteSSIDCookie: async function (
    _: any,
    res: Response,
    next: NextFunction
  ) {
    try {
      res.clearCookie('ssid');
      return next();
    } catch {
      return next({
        log: 'error in cookieController.deleteSSIDCookie',
        message: {
          err: `Error trying to delete SSID cookie`,
        },
      });
    }
  },
};

export default cookieController;
