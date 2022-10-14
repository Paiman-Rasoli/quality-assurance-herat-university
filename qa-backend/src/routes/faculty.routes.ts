import { Router } from "express";
import { FacultyService } from "../services";
import { authGuard } from "../middlewares/passport";
import { check } from "express-validator";

const facultyService = new FacultyService();

export const routes = Router();
routes.post(
  "/add",
  [check("username").not().isEmpty(), check("password").not().isEmpty()],
  authGuard,
  facultyService.addFaculty
);
