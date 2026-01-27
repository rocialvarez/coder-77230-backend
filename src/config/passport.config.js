import passport from "passport";
import local from "passport-local";
import jwt from "passport-jwt";
import User from "../models/user.model.js";
import { isValidPassword } from "../utils/bcrypt.js";

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

export const initPassport = () => {

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });
          if (!user) return done(null, false);

          if (!isValidPassword(user, password))
            return done(null, false);

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );


  passport.use(
    "current",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: "CoderCoder123"
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
