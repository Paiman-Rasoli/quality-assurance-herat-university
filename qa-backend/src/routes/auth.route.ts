import { Router } from "express";
import { LoginService } from "../services/login.service";

export const routes = Router();
const loginService = new LoginService();
routes.get("/login", loginService.login);
