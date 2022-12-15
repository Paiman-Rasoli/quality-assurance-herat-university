import { Response, Request } from "express";
import { validationResult } from "express-validator";
import { getMyRepository } from "../../data-source";
import { EvaluationFormEntity } from "../../entities";

export class FacultyReport {
  async facultyReport(req: Request, res: Response) {
    console.log("faculty", req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const body = req.body;

    const formModel = getMyRepository(EvaluationFormEntity);
    let evlForms: string | any[];

    evlForms = await formModel.find({
      where: {
        faculty: { id: +body.facultyId },
        year: +body.year,
        semester_type: body.semester_type,
      },
      relations: ["answers", "department", "faculty"],
    });

    console.log("eval form", evlForms);

    if (evlForms.length === 0) {
      return res.status(404).json({ data: null, message: "no form" });
    }
  }
}
