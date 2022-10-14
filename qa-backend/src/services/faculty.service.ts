import { Response, Request } from "express";
import { validationResult } from "express-validator";
import { getMyRepository } from "../data-source";
import { FacultyEntity } from "../entities";

export class FacultyService {
  async addFaculty(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // create a faculty
    const { fa_name, en_name, date } = req.body;
    const facultyModel = getMyRepository(FacultyEntity);
    const create: FacultyEntity = await facultyModel.save({
      fa_name: fa_name,
      en_name,
      date: date,
      createdAt: new Date(),
    });
    return res.status(200).json(create);
  }
  async allFaculty(req: Request, res: Response) {
    const facultyModel = getMyRepository(FacultyEntity);
    let data;
    // check if request wants paginated data
    if (+req.query?.page >= 1) {
      let skip: number = +req?.query?.page * +req?.query?.pageSize;
      skip = skip - +req?.query?.pageSize;
      data = await facultyModel.find({
        skip: skip,
        take: skip === 0 ? +req?.query?.pageSize : skip,
        relations: ["departments"],
      });
    } else {
      data = await facultyModel.find({
        relations: ["departments"],
      });
    }
    return res.status(200).json(data);
  }

  async findOne(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const facultyModel = getMyRepository(FacultyEntity);
    const findOne = await facultyModel.findOneBy({
      id: +req.query.id,
    });
    return res.status(200).json(findOne);
  }

  async updateFaculty(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const facultyModel = getMyRepository(FacultyEntity);
    const findOne = await facultyModel.update(
      {
        id: +req.body.id,
      },
      {
        ...req.body,
        createdAt: new Date(),
      }
    );
    return res
      .status(findOne.affected > 0 ? 200 : 500)
      .json({ updated: findOne.affected > 0 });
  }

  async deleteFaculty(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const facultyModel = getMyRepository(FacultyEntity);
    const deleteOne = await facultyModel.delete({
      id: +req.body.id,
    });
    return res
      .status(deleteOne.affected > 0 ? 200 : 500)
      .json({ deleted: deleteOne.affected > 0 });
  }
}
