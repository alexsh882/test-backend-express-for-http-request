import { Router  } from "express";
import { getImage } from "../controllers/images.controller.js";

const router = Router();

router.get("/image/:fileName", getImage);

export default router;