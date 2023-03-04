import express from "express";
import cors from "cors";
import router from "../routes";
import errorHandler from "../middleware/errorHandling.middleware";
import * as model from "../models/models";
import fileUpload from "express-fileupload";
import path from "path";

/* Создание модели в базе данных*/
model;

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "..", "..", "static")));
app.use(fileUpload());

app.use("/api", router);

app.use(errorHandler);
