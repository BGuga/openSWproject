import express from "express";
import { showMovies, movieInformation } from "../controllers/movieController";

const movieRouter = express.Router();

movieRouter.get('/',showMovies);

movieRouter.get('/:id', movieInformation);

export default movieRouter;