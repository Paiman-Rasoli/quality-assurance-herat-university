import passport from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";

passport.use(
  new JWTStrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    (payload, err) => {
      console.log("eer", err);
    }
  )
);

export const authGuard = passport.authenticate("jwt", { session: false });
