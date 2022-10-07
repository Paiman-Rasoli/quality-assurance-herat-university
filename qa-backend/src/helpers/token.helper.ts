import jwt from "jsonwebtoken";
//
export const generateToken = (user: Record<any, string>) => {
  return jwt.sign(user, process.env.JWT_SECRET);
};
