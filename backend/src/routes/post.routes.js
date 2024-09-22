import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createPost, postDetails, UpdatePost, deletePost, allPosts, userAllPosts } from "../controllers/post.controller.js";

const router = Router();

// public routes
router.get("/details/:id", authMiddleware, postDetails);

// secure routes
router.post(
    "/create",
    authMiddleware,
    upload.single("thumbnail"),
    createPost
);

router.patch(
    "/update/:id",
    authMiddleware,
    upload.single("thumbnail"),
    UpdatePost
);

router.delete("/delete/:id", authMiddleware, deletePost);

router.get("/all", authMiddleware, allPosts);

router.get("/user/all/:userId", authMiddleware, userAllPosts);

export default router;