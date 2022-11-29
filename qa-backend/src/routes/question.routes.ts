import { Router } from "express";
import { QuestionService } from "../services";
import { authGuard } from "../middlewares/passport";
import { check, body, query } from "express-validator";

const questionService = new QuestionService();

const routes = Router();
routes.post(
  "/add",
  [body("text").notEmpty()],
  authGuard,
  questionService.addQuestion
);

routes.get("/", questionService.get);
routes.delete(
  "/delete",
  [query("id").notEmpty()],
  authGuard,
  questionService.delete
);

routes.put(
  "/update",
  [body("id").notEmpty()],
  authGuard,
  questionService.update
);

export { routes };
