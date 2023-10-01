import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import db from '../models/db.ts';

const userController = {
  async createUser(req: Request, res: Response, next: NextFunction) {
    const saltRounds = 10;
    const password = 'Fkdj^45ci@Jad';
    const name = 'test1';
    const email = 'test2';
    console.log('entered createUser in userController', req.body);
    try {
      // const { name, email } = req.body;
      console.log('req.body', req.body);
      const createQuery = `
      INSERT INTO users
      (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *;`;
      bcrypt.hash(password, saltRounds)
        .then(async (hash: string) => {
          const result = await db.query(createQuery, [name, email, hash]);
          console.log(result);
          res.locals.user = result.rows[0];
          return next();
        })
        .catch((err) => next({
          log: `bcrypt password hashing error: ${err}`,
          message: { err: 'bcrypt hash error: check server logs for details.' },
        }));
      // const newUser = await db.create(name, email, password);

      // const createQuery = `
      // INSERT INTO users
      // (name, email, password)
      // VALUES ($1, $2, $3)
      // RETURNING *;
      //   `;

      // const result = await db.query(createQuery, [name, email, password]);

      // res.locals.user = result.rows[0];
      // console.log("made it to end of createUser", res.locals.user);
      // return next();
    } catch (err) {
      console.error('Error creating user:', err);
      next(err);
    }
  },

  async verifyUser(req: Request, res: Response, next: NextFunction) {
    try {
      // console.log("userController req bdy", req.body);
      const { email, password } = req.body;

      const findUserQuery = `
        SELECT _id, email, password
        FROM users
        WHERE email=$1 AND password=$2
      `;
      const result = await db.query(findUserQuery, [email, password]);
      console.log('login result', result);
      // rows: [ { _id: 1, email: 'trishanduong@gmail.com', password: '123' } ]
      res.locals.user = result.rows[0];
      return next();
    } catch (err) {
      console.error('Error verifying user:', err);
      return next(err);
    }
  },
};

export default userController;
