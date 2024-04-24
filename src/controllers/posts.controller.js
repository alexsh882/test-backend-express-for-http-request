import { join } from "path";
import { unlink } from "fs";

import fileDirName from "../utils/fileDir.js";
const { __dirname } = fileDirName(import.meta);

import Post from "../models/post.model.js";

const getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: ["id", "title", "content", "serverFileName", "format", "imageUrl"],    
    });

    if (posts.length === 0) {
      res.status(404).json({
        status: 404,
        message: "No hay posts registrados aún.",
      });
      return;
    }

    res.status(200).json({
      data: posts
    });
  } catch (error) {
    console.log(error);
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      res.status(400).json({
        status: 400,
        message: "Todos los campos son obligatorios.",
      });
      return;
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ mensaje: "El post va con imagen" });
    }

    const image = req.files.image;
    const originalFilename = image.name.split(".")[0];
    const serverFileName = `${Date.now()}`;
    const format = image.name.split(".")[1];

    const uploadPath = join(
      __dirname,
      "../../files/",
      `${serverFileName}.${format}`
    );

    console.log(uploadPath);

    image.mv(uploadPath, function (err) {
      if (err) throw res.status(500).json(err);
    });

    const newPost = await Post.create({
      title,
      content,
      serverFileName,
      originalFilename,
      format,
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
  }
};
const updatePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByPk(id);

    if (!post) {
      res.status(404).json({
        status: 404,
        message: "Post no encontrado",
      });
      return;
    }

    const { title, content } = req.body;

    if (!title || !content) {
      res.status(400).json({
        status: 400,
        message: "Todos los campos son obligatorios.",
      });
      return;
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ mensaje: "El post va con imagen" });
    }

    await Post.update(
      {
        title,
        content,
      },
      {
        where: {
          id,
        },
      }
    );

    res.status(200).json({
      status: 200,
      message: "Post actualizado",
    });

  } catch (error) {
    console.log(error);
  }
};
const deletePost = async (req, res) => {
  const { id } = req.params;

  try {

    const post = await Post.findByPk(id);

    if (!post) {
      res.status(404).json({
        status: 404,
        message: "Post no encontrado",
      });
      return;
    }

    const uploadPath = join(
      __dirname,
      "../files/",
      `${post.serverFileName}.${post.format}`
    );

    await post.destroy();

    unlink(uploadPath, function (err) {
      if (err && err.code == "ENOENT") {
        console.log(err);
      }
      if (err) {
        
        console.log('anda a saber, error', err)
       
      }
    });

    res.status(200).json({
      status: 200,
      message: "Post eliminado",
    });
    
  } catch (error) {
    console.log(error);
  }
};

export { getPosts, createPost, updatePost, deletePost };
