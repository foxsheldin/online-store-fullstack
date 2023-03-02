import { app } from "./src/configs/app.config";
import * as dotenv from "dotenv";
import sequelize from "./src/configs/database.config";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startApp = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startApp();
