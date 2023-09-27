import { Request, Response, NextFunction } from "express";
// @ts-ignore
import db from "../models/db.ts";

const applicationController = {
  // create application
  createApplication: async function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { company_name, position, listing_link, notes, applied_date } =
        req.body.jobData;

      const data = [
        "1",
        company_name,
        position,
        listing_link,
        notes,
        applied_date,
        1,
      ];
      console.log(data);
      const createQuery = `INSERT INTO applications(user_id, company_name, position, listing_link, notes, applied_date, status_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
      `;
      const result = await db.query(createQuery, data);
      console.log("result", result.rows[0]);
      res.locals.application = result.rows[0];
      return next();
    } catch (err) {
      console.error(
        "Error updating Application in ApplicationController createApplications middleware:",
        err
      );
      return next(err);
    }
  },

  getApplications: async function (
    _: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user_id = 1;
      //console.log("entering getApplications middleware user_id:", req.body);
      const userIdQuery = `
      SELECT *
      FROM applications
      WHERE user_id=$1; `;
      const results = await db.query(userIdQuery, [user_id]);
      res.locals.applications = results.rows;
      return next();
    } catch (err) {
      console.error(
        "Error updating Application in ApplicationController getApplications middleware:",
        err
      );
      return next(err);
    }
  },

  updateApplication: async function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const {
        user_id,
        company_name,
        position,
        listing_link,
        notes,
        applied_date,
        last_updated,
        status_id,
        id,
      } = req.body;
      console.log("entering updateApplication middleware req.body: ", req.body);
      const updateQuery = `
      UPDATE applications
      SET ( user_id, company_name, position, listing_link, notes, applied_date, last_updated,status_id ) = ( $1, $2, $3, $4, $5, $6, $7, $8)
      WHERE _id=$9
      RETURNING*;
    `;
      const results = await db.query(updateQuery, [
        user_id,
        company_name,
        position,
        listing_link,
        notes,
        applied_date,
        last_updated,
        status_id,
        id,
      ]);
      res.locals.application = results.rows[0];

      return next();
    } catch (err) {
      console.error(
        "Error updating Application in ApplicationController updateApplication middleware:",
        err
      );
      next(err);
    }
  },

  deleteApplication: async function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.body;
      console.log("entering deleteApplication middleware: ID:", id);

      const deleteQuery = `
      DELETE FROM applications
      WHERE _id=$1
      RETURNING *;
    `;
      const results = await db.query(deleteQuery, [id]);
      res.locals.application = results.rows[0];

      return next();
    } catch (err) {
      console.error(
        "Error updating Application in ApplicationController deleteApplication middleware:",
        err
      );
      next(err);
    }
  },
};

export default applicationController;
