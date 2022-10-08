import { Request, Response } from "express";
import { User } from "../entities";
import { getMyRepository } from "../data-source";
import { isHashValid, generateToken } from "../helpers";
const { validationResult } = require("express-validator");

export class LoginService {
  async login(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    // find the user from db
    const userModel = getMyRepository(User);
    const findUser: User = await userModel.findOne({
      where: {
        userName: username,
      },
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
    });
    delete findUser.password;
    return res.status(200).json({ ...findUser, accessToken: token });
  }
}
