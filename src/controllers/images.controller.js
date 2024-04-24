import Post from "../models/post.model.js";

import { join } from "path";

import fileDirName from "../utils/fileDir.js";
const { __dirname } = fileDirName(import.meta);

const getImage = async (req, res) => {
  try {
    const { fileName } = req.params;

    const post = await Post.findOne({
      where: {
        serverFileName: fileName,
      },
    });

    if (!post) {
      res.status(404).json({
        status: 404,
        message: "Imagen no encontrada",
      });
      return;
    }

    const uploadPath = join(
      __dirname,
      "../files/",
      `${post.serverFileName}.${post.format}`
    );

    return res.sendFile(uploadPath);
  } catch (error) {
    console.log(error);
  }
};

export { getImage };
