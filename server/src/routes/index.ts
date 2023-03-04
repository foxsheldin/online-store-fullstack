import express from "express";
import brandRouter from "./brand.router";
import deviceRouter from "./device.router";
import typeRouter from "./type.router";
import userRouter from "./user.router";

const router = express.Router();

router.use("/brand", brandRouter);
router.use("/device", deviceRouter);
router.use("/type", typeRouter);
router.use("/user", userRouter);

export default router;
