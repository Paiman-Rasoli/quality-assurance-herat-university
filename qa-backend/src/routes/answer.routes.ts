import { Router } from "express";
import { AnswerService } from "../services";
import { authGuard } from "../middlewares/passport";
import { check } from "express-validator";

const answerService = new AnswerService();

export const routes = Router();
routes.post(
  "/add",
  [check("username").not().isEmpty(), check("password").not().isEmpty()],
  authGuard,
  answerService.addAnswers
);
