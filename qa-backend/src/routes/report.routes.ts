import { Router } from "express";
import { ReportService } from "../services";
import { body } from "express-validator";
import { authGuard } from "../middlewares/passport";

const reportService = new ReportService();

const routes = Router();
routes.post(
  "/",
  [
    body("departmentId").notEmpty(),
    body("year").notEmpty(),
    body("type").notEmpty(),
  ],
  authGuard,
  reportService.report
);
export { routes };