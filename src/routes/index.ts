import express, { Express } from "express";
import userRouter from "./users.route";

const router = (app: Express) => {
  app.use(express.json());
  app.use(userRouter);
};

export default router;
