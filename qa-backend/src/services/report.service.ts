import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { getMyRepository } from "../data-source";
import { EvaluationFormEntity } from "../entities";

export class ReportService {
  async addAnswers(req: Request, res: Response) {}

  async report(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // faculty , department , year, semester type
    const body = req.body;
    const formModel = getMyRepository(EvaluationFormEntity);
    let answers;
    if (body.teacherId) {
      console.log("🚀🚀🚀😜😜😢😢", body.teacherId);
      answers = await formModel.find({
        where: {
          teacher: {
            id: body.teacherId,
          },
          department: { id: +body.departmentId }, //
          year: +body.year,
          semester_type: body.type,
          semester: +body.semester,
        },
        relations: ["answers", "teacher", "subject"],
      });
    } else {
      answers = await formModel.find({
        where: {
          department: { id: +body.departmentId }, //
          year: +body.year,
          semester_type: body.type,
          semester: +body.semester,
        },
        relations: ["answers", "teacher", "subject"],
      });
    }
    // for all teachers in department
    if (answers.length === 0) {
      return res.status(200).json({ data: null });
    }
    // find the maximum score
    const purify = getPureData(answers);
    const final = getLastValue(purify);
    return res.status(200).json(final);
  }

  async reportEach(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // faculty , department , year, semester type, teacherId
    const body = req.body;
    const formModel = getMyRepository(EvaluationFormEntity);
    let answers;
    answers = await formModel.find({
      where: {
        teacher: {
          id: body.teacherId,
        },
        department: { id: +body.departmentId }, //
        year: +body.year,
        semester_type: body.type,
        semester: +body.semester,
      },
      relations: ["answers", "teacher", "subject"],
    });
    // for there were no form
    if (answers.length === 0) {
      return res.status(200).json({ data: null });
    }
    // TODO: get average for each question
  }
}

function getPureData(forms: any[]) {
  // const => [{teacherId : 1 , subjectId : 2 , sum : 450 , numberOfSibject : 2} ]
  const all = [];
  forms.map((form) => {
    let tempSum = 0;

    form.answers.map((response) => {
      const pure = Object.values(response.response);
      pure.forEach((score) => {
        tempSum += Number(score);
      });
    });
    let subs = form.answers?.length;
    if (subs > 0) {
      all.push({
        teacherId: form.teacher.id,
        subjectId: form.subject.id,
        sum: tempSum,
        subscribers: subs,
        // maximu: Object.values(form.answers[0]?.response).length * 5,
        average: getAverageEachSubject(tempSum, subs),
      });
    }
  });
  return all;
}

function getAverageEachSubject(sum: number, numbers: number) {
  return Math.round(sum / numbers);
}

function getLastValue(data: any[]) {
  const temp = {};

  data.map((item) => {
    if (temp[item.teacherId]) {
      temp[item.teacherId] = {
        ...temp[item.teacherId],
        average: temp[item.teacherId]["average"] + item.average,
        subscribers: temp[item.teacherId]["subscribers"] + item.subscribers,
        sum: temp[item.teacherId]["sum"] + item.sum,
      };
    } else {
      temp[item.teacherId] = item;
    }
  });
  return temp;
}
