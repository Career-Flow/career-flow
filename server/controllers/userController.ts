import { Request, Response, NextFunction } from "express";
// @ts-ignore
import db from "../models/db.ts";

const userController = {
  createUser: async function (req: Request, res: Response, next: NextFunction) {
    console.log("entered createUser in userController", req.body);
    try {
      //const { name, email, password } = req.body;
      console.log(req.body);
      console.log(res);
      // const newUser = await db.create(name, email, password);

      // const createQuery = `
      //       INSERT INTO users
      //       (name, email, password)
      //       VALUES ($1, $2, $3)
      //       RETURNING *;
      //   `;

      // const result = await db.query(createQuery, [name, email, password]);

      //res.locals.user = result.rows[0];
      //console.log("made it to end of createUser", res.locals.user);
      return next();
    } catch (err) {
      console.error("Error creating user:", err);
      next(err);
    }
  },

  verifyUser: async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const findUserQuery = `
        SELECT email, password
        FROM users
        WHERE email = $1 AND password = $2
      `;

      const result = await db.query(findUserQuery, [email, password]);

      res.locals.user = result.rows[0];
      return next();
    } catch (err) {
      console.error("Error verifying user:", err);
      next(err);
    }
  },
};

export default userController;
