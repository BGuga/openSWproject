import express from "express";
import {getJoin, getLogin, home, postJoin, postLogin} from "../controllers/globalController"
import { logout } from "../controllers/usersController";
const globalRouter = express.Router();

globalRouter.get('/',home);
globalRouter.get("/logout",logout)
globalRouter.route('/join').get(getJoin).post(postJoin)
globalRouter.route('/login').get(getLogin).post(postLogin)
export default globalRouter