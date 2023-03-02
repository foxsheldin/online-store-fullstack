import * as dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string, //Название БД
  process.env.DB_USER as string, //Пользователь
  process.env.DB_PASSWORD as string, //Пароль
  {
    dialect: "postgres",
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT as string),
  }
);

export default sequelize;
