// routes/user.routes.js
import express from "express";
import upload from "../middleware/multer.js";
import ApiResponse from "../utils/ApiResponse.js";
const router = express.Router();
import uploadonCloudinary from "../utils/cloudinary.js";
import { User } from "../models/user.model.js"; // 👈 make sure this exists

router.route("/register").post(
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  async (req, res) => {
    try {
      const { username, password, fullname, email } = req.body;

      let avatarUrl = "";
      if (req.files && req.files.avatar) {
        const localPath = req.files.avatar[0].path;
        const result = await uploadonCloudinary(localPath);

        if (result === -1) {
          return res.status(500).json({ success: false, message: "Cloudinary upload failed" });
        }

        avatarUrl = result.secure_url;
      }

      const user = await User.create({
        username,
        password,
        fullname,
        email,
        avatar: avatarUrl
      });

      return res.status(201).json(new ApiResponse(201, "User created successfully", user));
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, message: error.message });
    }
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
