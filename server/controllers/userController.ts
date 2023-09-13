import { Request, Response, NextFunction } from 'express';
import db from '../models/db';

const userController = {
  createUser: async function (req: Request, res: Response, next: NextFunction) {
    console.log('entered createUser in userController', req.body);
    try {
      const { name, email, password } = req.body; 

      // const newUser = await db.user.creat(name, email, password)

      const createQuery = `
            INSERT INTO users
            (name, email, password)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;

      const result = await db.query(createQuery, [name, email, password]);

      res.locals.user = result.rows[0];
        console.log('made it to end of createUser', res.locals.user);
      return next();
    } catch (err) {
      console.error('Error creating user:', err);
      next(err);
    }
  },
};

export default userController;
