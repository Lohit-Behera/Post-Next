import { Router } from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    userDetails,
    sendVerifyEmail,
    verifyEmail,
    getUserDetails,
    updateUserDetails,
    changePassword,
    googleAuth,
    userSearch,
    sendForgotPasswordMail,
    forgotPassword,
    changeUsername,
 } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { resizeImage } from "../middlewares/resize.middleware.js";

const router = Router();

// public routes
router.route("/register").post(
    upload.single("avatar"),
    resizeImage,
    registerUser
);

router.route("/login").post(loginUser)

router.route("/verify-email/:userId/:token").get(verifyEmail)

router.route("/user-details/:id").get(getUserDetails)

router.route("/auth/google").get(googleAuth)

router.route("/send/forgot-password/mail").post(sendForgotPasswordMail)

router.route("/forgot-password/:userId/:token").patch(forgotPassword)

// secure routes
router.route("/logout").post(authMiddleware, logoutUser)

router.route("/details").get(authMiddleware, userDetails)

router.route("/send-verify-email").post(authMiddleware, sendVerifyEmail)

router.route("/update/:userId").patch(
    authMiddleware,
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 },
    ]),
    resizeImage,
    updateUserDetails
)

router.route("/change-password").patch(authMiddleware, changePassword)

router.route("/search").post(authMiddleware, userSearch)


router.route("/change-username").patch(authMiddleware, changeUsername)

export default router