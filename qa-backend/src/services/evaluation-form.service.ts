import { Response, Request } from "express";
import { validationResult } from "express-validator";
import { getMyRepository } from "../data-source";
import { EvaluationFormEntity } from "../entities";

export class EvaluationForm {
  async addForm(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //TODO: add form ....
    const formModel = getMyRepository(EvaluationFormEntity);
    const bodyData = req.body as formInputDto;
    // console.log(bodyData, "body");

    try {
      const save = await formModel.upsert(bodyData, ["id"]);
      return res.status(200).json({ formId: save.identifiers[0]?.id });
    } catch (err) {
      console.error("Error while creating form.", err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  }
  async find(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const formModel = getMyRepository(EvaluationFormEntity);
    const find = await formModel.findOne({
      where: { id: +req?.query?.formId },
      relations: ["teacher", "subject", "department", "department.faculty"],
    });
    if (!find) {
      return res
        .status(404)
        .json({ msg: "Evaluation form with this id not found!" });
    }
    //* check expiration date
    // console.log(new Date(), "Form =>", find);
    // check if start
    if (find?.start_date > new Date()) {
      return res.status(401).json({ msg: "This form has not started yet." });
    }

    // check if ends
    if (find.end_date < new Date()) {
      return res.status(401).json({ msg: "This form has been expired." });
    }
    return res.status(200).json(find);
  }

  async findAll(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const formModel = getMyRepository(EvaluationFormEntity);
    const find = await formModel.find({
      relations: ["teacher", "subject", "department", "department.faculty"],
    });
    if (!find) {
      return res.status(404).json({ msg: "Not found any Evaluation form " });
    }
    //* check expiration date
    // console.log(new Date(), "Form =>", find);

    return res.status(200).json(find);
  }

  async updateForm(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const formModel = getMyRepository(EvaluationFormEntity);
    const findOne = await formModel.update(
      {
        id: +req.body.id,
      },
      {
        ...req.body,
      }
    );
    return res
      .status(findOne.affected > 0 ? 200 : 500)
      .json({ updated: findOne.affected > 0 });
  }

  async deleteForm(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const formModel = getMyRepository(EvaluationFormEntity);
    const deleteOne = await formModel.delete({
      id: +req?.query?.id,
    });

    return res
      .status(deleteOne.affected > 0 ? 200 : 400)
      .json({ deleted: deleteOne.affected > 0 });
  }
}

interface formInputDto {
  year: number;
  semester: number;
  semester_type: any;
  start_date: Date;
  end_date: Date;
  teacher: string | number;
  subject: string | number;
  department: string | number;
}
