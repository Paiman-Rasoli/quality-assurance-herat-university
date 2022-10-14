import { Router } from "express";
import { TeacherService } from "../services";
import { authGuard } from "../middlewares/passport";
import { check } from "express-validator";

const teacherService = new TeacherService();

export const routes = Router();
routes.post(
  "/add",
  [check("username").not().isEmpty(), check("password").not().isEmpty()],
  authGuard,
  teacherService.addTeacher
);
