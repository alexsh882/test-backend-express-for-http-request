import { Router  } from "express";
import { createPost, deletePost, getPosts, updatePost } from "../controllers/posts.controller.js";

const router = Router();

router.get("/posts", getPosts);
router.post("/posts", createPost);
router.put("/posts/:id/update", updatePost);
router.delete("/posts/:id/delete", deletePost);

export default router;