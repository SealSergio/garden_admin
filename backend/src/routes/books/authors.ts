import { Router } from "express";
import { Authors } from "../../database/index.js";

export const authorsRouter = Router();

authorsRouter.get("/", (req, res) => {
  res.status(200).json(Authors.getAllForAdmin());
});
