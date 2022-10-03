import { Request, Response } from "express";

export class LoginService {
  login(params: { req: Request; res: Response }) {
    params.res.send("Wow");
  }
}
