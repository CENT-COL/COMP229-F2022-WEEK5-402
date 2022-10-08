import { Router } from "express";

import {  DisplayMoviesList, 
    DisplayMoviesAddPage, 
    ProcessMoviesAddPage, 
    ProcessMoviesEditPage, 
    DisplayMoviesEditPage, 
    ProcessMoviesDelete } from "../controllers/movies.controller.server.js";

import { AuthGuard } from "../utils/index.js";

const router = Router();

router.get('/movie-list', DisplayMoviesList);
router.get('/movie-add', AuthGuard, DisplayMoviesAddPage);
router.post('/movie-add', AuthGuard,ProcessMoviesAddPage);
router.post('/movie-edit/:id', AuthGuard,ProcessMoviesEditPage);
router.get('/movie-edit/:id', AuthGuard,DisplayMoviesEditPage);
router.get('/movie-delete/:id', AuthGuard,ProcessMoviesDelete);

export default router;