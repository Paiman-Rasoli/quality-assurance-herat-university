import { Router } from "express";
import { ReportService } from "../services";
import { body } from "express-validator";
import { authGuard } from "../middlewares/passport";
import { FacultyReport } from "../services/reports/faculty.report..service";
import { Report } from "../services/reports/genral.report.service";

const reportService = new ReportService();
const facultyReportService = new FacultyReport();
const report = new Report();

const routes = Router();

routes.post(
  "/",
  [body("year").notEmpty(), body("semester_type").notEmpty()],
  authGuard,
  report.Report
);

routes.post(
  "/faculty",
  [
    body("facultyId").notEmpty(),
    body("year").notEmpty(),
    body("semester_type").notEmpty(),
  ],
  authGuard,
  facultyReportService.facultyReport
);

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
    body("subjectId").notEmpty(),
  ],
  authGuard,
  reportService.reportEach
);

export { routes };
