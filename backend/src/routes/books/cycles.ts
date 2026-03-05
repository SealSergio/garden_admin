import { Router } from "express";

import { Cycles } from "../../database/index.js";

export const cyclesRouter = Router();

cyclesRouter.get("/", (req, res) => {
  res.status(200).json(Cycles.getAllForAdmin());
});
