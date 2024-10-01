import { Router } from "express";
import UserController from "../controllers/users.controller";
const userRouter = Router();

userRouter.get("/users", UserController.getAll);
userRouter.get("/users/:id", UserController.getById);
userRouter.post("/users", UserController.save);
userRouter.put("/users/:id", UserController.update);
userRouter.delete("/users/:id", UserController.delete);

export default userRouter;
