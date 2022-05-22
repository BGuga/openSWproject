import express from "express";
import { userId, userLikemovie } from "../controllers/usersController";

const userRouter = express.Router();

userRouter.get('/:id(\\d+)', userId);
userRouter.get('/likemovie', userLikemovie);

export default userRouter