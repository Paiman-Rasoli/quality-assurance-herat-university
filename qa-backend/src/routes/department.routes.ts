import { Router } from "express";
import { DepartmentService } from "../services";
import { authGuard } from "../middlewares/passport";
import { check, query } from "express-validator";

const departmentService = new DepartmentService();

const routes = Router();

routes.get("/", authGuard, departmentService.all);
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

routes.put(
  "/",
  authGuard,
  [
    check("id").notEmpty().withMessage("id is required!"),
    check("fa_name").isString().not().isEmpty(),
    check("en_name").isString().not().isEmpty(),
    check("date").isDate(),
  ],
  departmentService.update
);

routes.delete(
  "/",
  authGuard,
  [check("id").notEmpty().withMessage("id is required!")],
  departmentService.delete
);

routes.get(
  "/find-one",
  authGuard,
  [query("id").notEmpty().withMessage("id is required!")],
  departmentService.findOne
);

export { routes };
