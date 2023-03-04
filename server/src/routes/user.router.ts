import express from "express";
import userController from "../controllers/user.controller";
import authMiddleware from "../middleware/auth.midleware";

const userRouter = express.Router();

userRouter.post("/registration", userController.registration);
userRouter.post("/login", userController.login);
userRouter.get("/auth", authMiddleware, userController.check);

export default userRouter;
