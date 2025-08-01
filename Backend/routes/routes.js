import express from "express";
import { Router } from "express";

import { refreshAccessToken ,LogoutUser ,LoginUser ,registerUser } from "../controllers/controllers.js";

import upload from "../middleware/multer.js"; 
import verifyJWT from "../middleware/auth.middleware.js"; 


const router = express.Router();

router.route("/register").post(
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  registerUser
);

router.route("/login").post(LoginUser);
router.route("/logout").post(verifyJWT ,  LogoutUser);
router.route('/refresh-token').post(refreshAccessToken)
// router.route("/history").post(userHistory);
// router.route("/expense").post(addExpense);

export default router;
