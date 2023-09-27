import { Request, Response, NextFunction } from "express";
// @ts-ignore
import db from "../models/db.ts";

const userController = {
  createUser: async function (req: Request, _: Response, next: NextFunction) {
    console.log("entered createUser in userController", req.body);
    try {
      //const { name, email, password } = req.body;
      console.log("req.body", req.body);
      // const newUser = await db.create(name, email, password);

      // const createQuery = `
      // INSERT INTO users
      // (name, email, password)
      // VALUES ($1, $2, $3)
      // RETURNING *;
      //   `;

      // const result = await db.query(createQuery, [name, email, password]);

      //res.locals.user = result.rows[0];
      //console.log("made it to end of createUser", res.locals.user);
      // return next();
    } catch (err) {
      console.error("Error creating user:", err);
      next(err);
    }
  },

  verifyUser: async function (req: Request, res: Response, next: NextFunction) {
    try {
      //console.log("userController req bdy", req.body);
      const { email, password } = req.body;

      const findUserQuery = `
        SELECT _id, email, password
        FROM users
        WHERE email=$1 AND password=$2
      `;
      const result = await db.query(findUserQuery, [email, password]);
      console.log("login result", result);
      res.locals.user = result.rows[0]; //rows: [ { _id: 1, email: 'trishanduong@gmail.com', password: '123' } ]
      return next();
    } catch (err) {
      console.error("Error verifying user:", err);
      next(err);
    }
  },
};

export default userController;
