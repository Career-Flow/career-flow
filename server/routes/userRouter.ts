import express from "express";
import userController from "../controllers/userController";
//import authController from "../controllers/authController";

const userRouter = express.Router();

userRouter.post('/', userController.createUser, (req, res) => {
    return res.status(201).json(res.locals.user);
  })

// cookie parser
// bycrypt? jwt?


// signup - POST '/' 

// login - POST '/'




export default userRouter;