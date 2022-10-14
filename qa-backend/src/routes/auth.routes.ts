import { Router } from "express";
import { LoginService } from "../services";
import { authGuard } from "../middlewares/passport";
import { check } from "express-validator";

const loginService = new LoginService();
export const routes = Router();
routes.post(
  "/login",
  [check("username").not().isEmpty(), check("password").not().isEmpty()],
  loginService.login
);
routes.post("/add", authGuard);
