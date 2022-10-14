import { Router } from "express";
import { DepartmentService } from "../services";
import { authGuard } from "../middlewares/passport";
import { check } from "express-validator";

const departmentService = new DepartmentService();

export const routes = Router();
routes.post(
  "/add",
  [check("username").not().isEmpty(), check("password").not().isEmpty()],
  authGuard,
  departmentService.addDepartment
);
