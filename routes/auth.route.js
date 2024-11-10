import express from "express";
import {
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
  verifyEmail,
  checkAuth,
  adminCheck,
  google,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth, authorizeRoles);
router.get("/admin", verifyToken, adminCheck, authorizeRoles);

router.post("/register", register);
router.post("/login", login);
router.post("/google", google);
router.get("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/verify-email", verifyEmail);

export default router;
