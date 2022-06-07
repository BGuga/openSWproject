import express from "express";
import { movieInformation, getDiscover, postDiscover } from "../controllers/movieController";

const movieRouter = express.Router();

movieRouter.get('/:id(\\d+)', movieInformation);

movieRouter.route('/discover/').get(getDiscover).post(postDiscover)


export default movieRouter;