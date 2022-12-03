import { Router } from "express";
import { EvaluationForm } from "../services";
import { authGuard } from "../middlewares/passport";
import { body, query } from "express-validator";

const evaluationForm = new EvaluationForm();

const routes = Router();
routes.post(
  "/add",
  [
    body("teacher").notEmpty(),
    body("subject").notEmpty(),
    body("year").notEmpty(),
    body("semester_type").notEmpty(),
    body("semester").notEmpty(),
    body("start_date").notEmpty(),
    body("end_date").notEmpty(),
    body("department").notEmpty(),
  ],
  authGuard,
  evaluationForm.addForm
);

routes.get(
  "/find",
  [query("formId").notEmpty().withMessage("FormId is required")],
  evaluationForm.find
);

routes.get("/", [authGuard], evaluationForm.findAll);

export { routes };
