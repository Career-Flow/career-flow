import { Request, Response, NextFunction } from 'express';
// import db from '../models/db';

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
    isLoggedIn: async function (req: Request, res: Response, next: NextFunction) {
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