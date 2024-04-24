import { Sequelize, DataTypes } from "sequelize";
import { environments } from "./environments.js";


const sequelize = new Sequelize({
  dialect: environments.DB.DB_DIALECT,
  storage: environments.DB.DB_STORAGE,
});

export { DataTypes, sequelize };
