import jwt from "jsonwebtoken";
//
export const generateToken = (user: Record<string, any>) => {
  return jwt.sign({ user }, process.env.JWT_SECRET);
};
