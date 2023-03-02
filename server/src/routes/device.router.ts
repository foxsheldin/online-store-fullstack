import express from "express";
import deviceController from "../controllers/device.controller";
import checkRoleMiddleware from "../middleware/checkRole.middleware";

const deviceRouter = express.Router();

deviceRouter.post("/", checkRoleMiddleware("ADMIN"), deviceController.create);
deviceRouter.get("/", deviceController.getAll);
deviceRouter.get("/:id", deviceController.getOne);

export default deviceRouter;
