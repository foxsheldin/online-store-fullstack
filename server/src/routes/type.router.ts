import express from "express";
import typeController from "../controllers/type.controller";
import checkRoleMiddleware from "../middleware/checkRole.middleware";

const typeRouter = express.Router();

typeRouter.post("/", checkRoleMiddleware("ADMIN"), typeController.create);
typeRouter.get("/", typeController.getAll);

export default typeRouter;
