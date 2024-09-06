import { Router } from "express";
import {
  loginController,
  logoutController,
} from "../controllers/authController.js";

export const authRoutes = Router();

authRoutes.route("/login").post(loginController);

authRoutes.route("/logout").get(logoutController);