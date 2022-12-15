import { Router } from "express";
import { ReportService } from "../services";
import { body } from "express-validator";
import { authGuard } from "../middlewares/passport";

const reportService = new ReportService();

const routes = Router();
routes.post(
  "/department",
  [
    body("departmentId").notEmpty(),
    body("year").notEmpty(),
    body("semester_type").notEmpty(),
  ],
  authGuard,
  reportService.departmentReport
);

routes.post(
  "/each",
  [
    body("teacherId").notEmpty(),
    body("departmentId").notEmpty(),
    body("year").notEmpty(),
    body("semester_type").notEmpty(),
  ],
  authGuard,
  reportService.departmentReport
);

routes.post(
  "/teacher",
  [
    body("teacherId").notEmpty(),
    body("year").notEmpty(),
    body("semester_type").notEmpty(),
  ],
  authGuard,
  reportService.teacherReport
);

routes.post(
  "/each",
  [
    body("teacherId").notEmpty(),
    body("departmentId").notEmpty(),
    body("year").notEmpty(),
    body("type").notEmpty(),
  ],
  authGuard,
  reportService.reportEach
);

export { routes };
