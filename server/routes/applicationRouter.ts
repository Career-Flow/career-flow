import express from 'express';
import applicationController from '../controllers/applicationController.ts';
import sessionController from '../controllers/sessionController.ts';

const router = express.Router();

// add an application (POST)
router.post('/', sessionController.isLoggedIn, applicationController.createApplication, (_, res) => res.status(201).json(res.locals.application));

// get all applications to populate board (GET)
// get applications to populate 'not applied' display
// get applications to populate 'in progress' display
// get applications to populate 'done' display
router.get('/', sessionController.isLoggedIn, applicationController.getApplications, (_, res) => res.status(200).json(res.locals.applications));

router.delete('/', applicationController.deleteApplication, (_, res) => res.status(201).json(res.locals.application));
// update application (PATCH)
// status
// using drag and drop
// using drop down
// application details
// save functionality
router.put('/', applicationController.updateApplication, (_, res) => res.status(201).json(res.locals.application));
// router.patch('/', applicationController.updateApplication, (_, res) => {
//   res.locals.application;
// });

export default router;
