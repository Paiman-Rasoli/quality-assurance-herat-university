import { Request, Response } from "express";
import { UserEntity } from "../entities";
import { getMyRepository } from "../data-source";
import { isHashValid, generateToken, hashData } from "../helpers";
import { logger } from "../lib";
const { validationResult } = require("express-validator");

export class UserService {
  async login(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    // find the user from db
    const userModel = getMyRepository(UserEntity);
    const findUser: UserEntity = await userModel.findOne({
      where: {
        userName: username,
      },
      relations: ["faculty"],
    });
    // if not found throw an error 400
    if (!findUser) {
      return res.status(400).json({ msg: "Wrong Email or Password!" });
    }
    // compare password
    const passwordCompared = await isHashValid(password, findUser.password);

    if (!passwordCompared) {
      return res.status(400).json({ msg: "Wrong Email or Password!" });
    }
    const token = generateToken({
      id: findUser.id,
      level: findUser.is_super_admin,
      username: findUser.userName,
      faculty: findUser.faculty,
    });
    delete findUser.password;
    return res.status(200).json({ ...findUser, accessToken: token });
  }

  async register(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const body = req.body;
    // find the user from db
    const userModel = getMyRepository(UserEntity);
    const findUser = await userModel.findOneBy({
      userName: body.username,
    });
    // if not found throw an error 400
    if (findUser) {
      return res.status(400).json({ msg: "This username already taken!" });
    }
    const passwordHashed = await hashData(body.password);
    try {
      const create = await userModel.save({
        name: body.name,
        userName: body.username,
        createdAt: new Date(),
        password: passwordHashed,
        faculty: +body.faculty,
        date: body.date || new Date(),
        gender: body.gender,
        phone: body.phone,
      });
      const token = generateToken({
        id: create.id,
        level: create.is_super_admin,
        username: create.userName,
      });
      delete create.password;
      return res.status(200).json({ ...create, accessToken: token });
    } catch (err) {
      logger.error("Error happened while registering user.");
      return res.status(500).json({ msg: "INTERNAL_SERVER_ERROR" });
    }
  }

  async get(req: Request, res: Response) {}
}
