import { Router } from "express";

import { Genres } from "../../database/index.js";

export const genresRouter = Router();

genresRouter.get("/", (req, res) => {
  res.status(200).json(Genres.getAllForAdmin());
});
