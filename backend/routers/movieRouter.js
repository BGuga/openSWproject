import express from "express";
import { showMovies } from "../controllers/movieController";

const movieRouter = express.Router();

movieRouter.get('/',showMovies);

export default movieRouter;