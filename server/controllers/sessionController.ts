import { Request, Response, NextFunction } from 'express';
// @ts-ignore
import db from '../models/db.ts';

const sessionController = {
    // start session
    startSession: async function (_: Request, res: Response, next: NextFunction) {
        console.log('entering sessionController middleware', res.locals.user)
        try {
        if(!res.locals.user) return next({
            status: 400,
            message: 'error in sessionSession.startSession'
        });
        const { _id } = res.locals.user;
        const randCookie = Math.random();
        const createQuery = `INSERT INTO sessions (cookie_id, user_id) VALUES ($1, $2);`;
        await db.query(createQuery, [randCookie, _id]);
        // console.log('jordan sucks', result.rows[0]);
        // res.locals.session = result.rows[0];
        // console.log(res.locals.session);
        res.locals.user.cookie = randCookie;
        console.log('reached the end of startSession middleware', res.locals.user)
        return next();
    } catch (err) {
        return next({
            status: 400,
            message: 'error in sessionSession.startSession'
        }); 
    }
    },
    // end session
    // endSession: async function (req: Request, res: Response, next: NextFunction) {

    // },
    // isLoggedIn
    isLoggedIn: async function (req: Request, _: Response, next: NextFunction) {
      if (req.cookies.SSID === undefined) {
        return next({
            status: 403,
            message: 'You are not logged in.'
        })
    }
    
      return next();
    }

}

export default sessionController;