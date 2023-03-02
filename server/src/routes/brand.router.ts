import express from "express";
import brandController from "../controllers/brand.controller";
import checkRoleMiddleware from "../middleware/checkRole.middleware";

const brandRouter = express.Router();

brandRouter.post("/", checkRoleMiddleware("ADMIN"), brandController.create);
brandRouter.get("/", brandController.getAll);

export default brandRouter;
