import { Router } from "express";
import { EvaluationForm } from "../services";
import { authGuard } from "../middlewares/passport";
import { check } from "express-validator";

const evaluationForm = new EvaluationForm();

export const routes = Router();
routes.post(
  "/add",
  [check("username").not().isEmpty(), check("password").not().isEmpty()],
  authGuard,
  evaluationForm.addForm
);
