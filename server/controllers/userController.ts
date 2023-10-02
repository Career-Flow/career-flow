import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import db from '../models/db.ts';

const userController = {
  async createUser(req: Request, res: Response, next: NextFunction) {
    const saltRounds = 10;
    console.log('entered createUser in userController', req.body);
    try {
      const { name, email, password } = req.body;
      console.log('req.body', req.body);
      const createQuery = `
      INSERT INTO users
      (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *;`;
      const hash = await bcrypt.hash(password, saltRounds); // Wait for bcrypt.hash to complete
      const result = await db.query(createQuery, [name, email, hash]);
      const [user] = result.rows;
      res.locals.user = user;
      return next();
      return next();
    } catch (err) {
      console.error('Error creating user:', err);
      return next(err);
    }
  },

  async verifyUser(req: Request, res: Response, next: NextFunction) {
    try {
      // console.log("userController req bdy", req.body);
      const { email, password } = req.body;

      const findUserQuery = `
        SELECT _id, email, password
        FROM users
        WHERE email=$1
      `;
      const result = await db.query(findUserQuery, [email]);
      const match = await bcrypt.compare(password, result.rows[0].password);
      console.log('login result', match);
      // rows: [ { _id: 1, email: 'trishanduong@gmail.com', password: '123' } ]
      if (match) {
        const [user] = result.rows;
        res.locals.user = user;
        return next();
      }
      throw new Error('Password does not match');
    } catch (err) {
      console.error('Error verifying user:', err);
      return next(err);
    }
  },
};

export default userController;
