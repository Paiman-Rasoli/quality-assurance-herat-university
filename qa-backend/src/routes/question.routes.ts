import { Router } from "express";
import { QuestionService } from "../services";
import { authGuard } from "../middlewares/passport";
import { check } from "express-validator";

const questionService = new QuestionService();

export const routes = Router();
routes.post(
  "/add",
  [check("username").not().isEmpty(), check("password").not().isEmpty()],
  authGuard,
  questionService.addQuestion
);
