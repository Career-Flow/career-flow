/* eslint-disable @typescript-eslint/naming-convention */
import { Request, Response, NextFunction } from 'express';
import db from '../models/db.ts';


const applicationController = {
  // create application
  async createApplication(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const {
        company_name, position, listing_link, notes, applied_date,
      } = req.body.jobData;
      const { userId } = res.locals;
      const data = [
        userId, // passed in from sessionController jwt
        company_name,
        position,
        listing_link,
        notes,
        applied_date,
        1, // always 1 because createApplication always starts at Not Applied which is status_id 1
      ];
      const createQuery = `INSERT INTO applications(user_id, company_name, position, listing_link, notes, applied_date, status_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
      `;
      const newApp = await db.query(createQuery, data);
      const returnedApp = newApp.rows[0];
      const newAppQuery = `SELECT applications._id, applications.user_id, applications.company_name, applications.position, applications.listing_link, 
      applications.notes, applications.applied_date, applications.last_updated, status.name AS status
      FROM applications
      JOIN status ON applications.status_id = status._id
      WHERE applications.user_id = $1
      ORDER BY applications._id ASC;  
      `;
      const result = await db.query(newAppQuery, [returnedApp.user_id]);
      const [application] = result.rows;
      res.locals.application = application;
      return next();
    } catch (err) {
      console.error(
        'Error creating Application in ApplicationController createApplications middleware:',
        err,
      );
      return next({
        log: `error in applicationController.createApplication: ${err}`,
        message: {
          err: `Error in creating application: ${err}`,
        },
      });
    }
  },

  async getApplications(
    _: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const user_id = res.locals.userId;
      // console.log("entering getApplications middleware user_id:", req.body);
      const userIdQuery = `
      SELECT applications._id, applications.user_id, applications.company_name, applications.position, applications.listing_link, 
        applications.notes, applications.applied_date, applications.last_updated, status.name AS status
      FROM applications
      JOIN status ON applications.status_id = status._id
      WHERE applications.user_id = $1
      ORDER BY applications._id ASC;   `; // query joins applications table with status so status._id is replaced with status
      const results = await db.query(userIdQuery, [user_id]);
      res.locals.applications = results.rows;
      return next();
    } catch (err) {
      console.error(
        'Error updating Application in ApplicationController getApplications middleware:',
        err,
      );
      return next(err);
    }
  },

  async updateApplication(
    req: Request,
    res: Response,
    next: NextFunction,
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
      console.log('entering updateApplication middleware req.body: ', req.body);
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
      const [application] = results.rows;
      res.locals.application = application;

      return next();
    } catch (err) {
      console.error(
        'Error updating Application in ApplicationController updateApplication middleware:',
        err,
      );
      return next(err);
    }
  },

  async deleteApplication(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.body;
      console.log('entering deleteApplication middleware: ID:', id);

      const deleteQuery = `
      DELETE FROM applications
      WHERE _id=$1
      RETURNING *;
    `;
      const results = await db.query(deleteQuery, [id]);
      const [application] = results.rows;
      res.locals.application = application;

      return next();
    } catch (err) {
      console.error(
        'Error updating Application in ApplicationController deleteApplication middleware:',
        err,
      );
      return next(err);
    }
  },
};

export default applicationController;
