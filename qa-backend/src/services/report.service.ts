import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { getMyRepository } from "../data-source";
import { DepartmentEntity, EvaluationFormEntity, RESPONSES } from "../entities";

export class ReportService {
  async addAnswers(req: Request, res: Response) {}

  async departmentReport(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // faculty , department , year, semester type
    const body = req.body;
    const formModel = getMyRepository(EvaluationFormEntity);
    let evlForm;

    evlForm = await formModel.find({
      where: {
        department: { id: +body.departmentId }, //
        year: +body.year,
        semester_type: body.type,
        semester: +body.semester,
      },
      relations: ["answers", "teacher", "subject"],
    });

    // for all teachers in department
    if (evlForm.length === 0) {
      return res.status(200).json({ data: null, n: "no data" });
    }

    const departmentModel = getMyRepository(DepartmentEntity);
    const department = await departmentModel.findOne({
      where: { id: body.departmentId },
      relations: ["faculty"],
    });

    // find the maximum score
    const purifySubject = reportOfEachSubjectForTeacher(evlForm);
    const purifyTeachersOfDep = totalReport(purifySubject);
    return res.status(200).json({
      final: purifyTeachersOfDep,
      nodata: "department",
      purify: purifySubject,
      answers: evlForm,
      department: department,
      semester: body.semester,
    });
  }
  async teacherReport(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // faculty , department , year, semester type
    const body = req.body;
    const formModel = getMyRepository(EvaluationFormEntity);
    let evlForm;

    console.log("🚀🚀🚀😜😜😢😢", body.teacherId);
    evlForm = await formModel.find({
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

    // for all teachers in department
    if (evlForm.length === 0) {
      return res.status(200).json({ data: null, n: "no data" });
    }

    // find the maximum score
    const purifySubject = reportOfEachSubjectForTeacher(evlForm);
    const purifyTeachersOfDep = totalReport(purifySubject);
    return res.status(200).json({
      final: purifyTeachersOfDep,
      nodata: "final",
      purify: purifySubject,
      answers: evlForm,
    });
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

    let numberOfQuestions;
    form.answers.map((response) => {
      const pure = Object.values(response.response);
      pure.forEach((score) => {
        tempSum += Number(score);
      });
      numberOfQuestions = pure.length;
    });
    let subs = form.answers?.length;
    if (subs > 0) {
      all.push({
        teacherId: form.teacher.id,
        subjectId: form.subject.id,
        sum: tempSum,
        subscribers: subs,
        // maximu: Object.values(form.answers[0]?.response).length * 5,
        average: getAverage(tempSum, subs),
        percent:
          (getAverage(tempSum, subs) * 100) /
          (numberOfQuestions * RESPONSES.VERY_HEIGH),
      });
    }
  });
  return all;
}
function reportOfEachSubjectForTeacher(forms: any[]) {
  // const => [{teacherId : 1 , subjectId : 2 , sum : 450 , numberOfSibject : 2} ]
  const all = [];

  // console.log("forms", forms);

  forms.map((form) => {
    let tempSum = 0;
    let tempPercent = 0;
    let numberOfQuestions = 0;
    form.answers.map((response) => {
      const pure = Object.values(response.response);
      let temp = 0;
      pure.forEach((score) => {
        // tempSum += Number(score);
        temp += Number(score);
      });

      numberOfQuestions = pure.length;
      tempSum += +getAverage(temp, numberOfQuestions);
      let fromPercent =
        (temp * 100) / (numberOfQuestions * RESPONSES.VERY_HEIGH);
      tempPercent += fromPercent;
    });
    let subs = form.answers?.length;
    // console.log(
    //   "subs:",
    //   subs,
    //   "form-id:",
    //   form.id,
    //   "temp:",
    //   tempSum,
    //   "numOfQuestions",
    //   numberOfQuestions
    // );

    if (subs > 0) {
      all.push({
        teacherId: form.teacher.id,
        subjectId: form.subject.id,
        sum: tempSum,
        subscribers: subs,
        average: tempSum / subs,
        percent: tempPercent / subs,
      });
    }
  });
  // console.log("all", all);

  return all;
}

function getAverage(sum: number, numbers: number) {
  return +(sum / numbers).toFixed(2);
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
        percent: item.average / (100 / item.subscribers / 5),
      };
    } else {
      temp[item.teacherId] = item;
    }
  });
  return temp;
}
function totalReport(data: any[]) {
  const temp = { average: 0, percent: 0, subscribers: 0, departmentId: 0 };

  data.map((item) => {
    // console.log(item, "itemssssssss");
    temp["departmentId"] = +item.departmentId;
    temp["average"] += +(item.average / data.length);
    temp["percent"] += +(item.percent / data.length);
    temp["subscribers"] += +item.subscribers;
  });

  // console.log("temp🎉🎉", temp);

  return temp;
}
