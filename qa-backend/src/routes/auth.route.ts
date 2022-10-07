import { Router } from "express";
import { loginService } from "../services/login.service";
import { authGuard } from "../middlewares/passport";

export const routes = Router();
routes.get("/login", loginService.login);
routes.post("/register", authGuard);
