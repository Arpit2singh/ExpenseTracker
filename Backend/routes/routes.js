// routes/user.routes.js
import express from "express";
import upload from "../middleware/multer.js";
import ApiResponse from "../utils/ApiResponse.js";
const router = express.Router();

router.route("/register").post(
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  (req, res) => {
    res.send(new ApiResponse(202 , "hey i is the /register" ) );
  }
);

router.route("/Login").post((req, res) => {
  res.send("✅ Login route hit!");
});

router.route("/History").post((req, res) => {
  res.send("📜 History route");
});

router.route("/expense").post((req, res) => {
  console.log("📦 Expense route hit");
  res.send("Expense received");
});

export default router;
