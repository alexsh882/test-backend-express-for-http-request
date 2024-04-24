import { DataTypes, sequelize } from "../config/database.js";
import fs from "fs";

import fileDirName from "../utils/fileDir.js";
const { __dirname } = fileDirName(import.meta);

const Post = sequelize.define(
  "Post",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.STRING,
    },
    serverFileName: {
      type: DataTypes.STRING,
    },
    originalFilename: {
      type: DataTypes.STRING,
    },
    format: {
      type: DataTypes.STRING,
    },
    imageUrl: {
      type: DataTypes.VIRTUAL,
      get() {
        if (
          this.serverFileName &&
          fs.existsSync(
            `${__dirname}/../../files/${this.serverFileName}.${this.format}`
          )
        ) {
          return `http://192.168.100.5:3000/files/${this.serverFileName}`;
        }
        return ``;
      },
    },
  },
  {
    sequelize,
    modelName: "Post",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored: true,
  }
);

// Post.sync();

export default Post;
