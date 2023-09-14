import express from 'express';
// @ts-ignore
import applicationController from "../controllers/applicationController.ts";
//import sessionController from "../controllers/sessionController";

const router = express.Router();

// add an application (POST)
router.post('/', applicationController.createApplication, (_, res) => {
  return res.status(201).json(res.locals.applications);
});


// get all applications to populate board (GET)
  // get applications to populate 'not applied' display
  // get applications to populate 'in progress' display
  // get applications to populate 'done' display
router.get('/', applicationController.getApplications,(_, res) => {res.locals.applications});

router.delete('/', applicationController.deleteApplication,(_,res)=>{
  return res.status(201).json(res.locals.application)
})
// update application (PATCH)
    // status
        // using drag and drop
        // using drop down
    // application details
        // save functionality     
router.put('/', applicationController.updateApplication, (_, res) => {
  return res.status(201).json(res.locals.application)
});
// router.patch('/', applicationController.updateApplication, (_, res) => {
//   res.locals.application;
// });


export default router;