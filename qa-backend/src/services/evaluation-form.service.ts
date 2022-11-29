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
  }
  async find(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const formModel = getMyRepository(EvaluationFormEntity);
    const find = await formModel.findOne({
      where: { id: +req?.query?.formId },
      relations: ["teacher", "subject"],
    });
    if (!find) {
      return res
        .status(404)
        .json({ msg: "Evaluation form with this id not found!" });
    }
    //* check expiration date
    console.log(new Date(), "Form =>", find);
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
}
