import { Router } from "express";
import { DepartmentService } from "../services";
import { authGuard } from "../middlewares/passport";
import { check } from "express-validator";

const departmentService = new DepartmentService();

const routes = Router();

routes.get("/", authGuard, departmentService.find);
routes.post(
  "/",
  [
    check("fa_name").isString().notEmpty(),
    check("en_name").isString().notEmpty(),
    check("date").isDate(),
    check("facultyId").notEmpty(),
  ],
  authGuard,
  departmentService.create
);
export { routes };
