import { Router } from "express";
import { Products } from "../../database/index.js";

export const productsRouter = Router();

productsRouter.get("/", (req, res) => {
  res.status(200).json(Products.getAllForAdmin());
});
