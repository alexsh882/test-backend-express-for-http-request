import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import fileUpload from "express-fileupload";

import routesPosts from "./routes/posts.routes.js";
import routesImages from "./routes/images.routes.js";

import { sequelize } from "./config/database.js";

import { environments } from './config/environments.js';

import fileDirName from "./utils/fileDir.js";
const { __dirname } = fileDirName(import.meta);

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(
  fileUpload({
    createParentPath: true,
  })
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión a base de datos exitosa");
    sequelize.sync({ force: false }).then(() => {
      console.log("Tablas sincronizadas");
    });
  })
  .catch((error) => console.log("Error al conectar a base de datos", error));



app.use("/", routesPosts);
app.use("/", routesImages)
app.use("*", (_req, res) => {
  res.status(404).json({
    status: 404,
    message: "Ruta no encontrada",
  });
})


app.listen(3000, () => {
  console.log(`Server corriendo en ${environments.APP_URL}:${environments.APP_PORT}`);
});
