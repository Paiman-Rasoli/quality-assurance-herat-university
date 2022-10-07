import passport from "passport";
import { ExtractJwt, Strategy as JWTStrategy, Strategy } from "passport-jwt";

passport.use(
  new JWTStrategy(
    {
      secretOrKey: "XYZ",
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    (payload, err) => {
      console.log("eer", err);
    }
  )
);

export const authGuard = passport.authenticate("jwt", { session: false });
