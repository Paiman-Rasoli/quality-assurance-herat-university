import { Router } from "express";
import { SubjectService } from "../services";
import { authGuard } from "../middlewares/passport";
import { check } from "express-validator";

const subjectService = new SubjectService();

export const routes = Router();
routes.post(
  "/add",
  [check("username").not().isEmpty(), check("password").not().isEmpty()],
  authGuard,
  subjectService.addSubject
);
