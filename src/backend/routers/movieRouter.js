import express from "express";
import { showMovies, movieInformation, getDiscover, postDiscover } from "../controllers/movieController";

const movieRouter = express.Router();

movieRouter.get('/',showMovies);

movieRouter.get('/:id(\\d+)', movieInformation);

movieRouter.route('/discover/').get(getDiscover).post(postDiscover)


export default movieRouter;