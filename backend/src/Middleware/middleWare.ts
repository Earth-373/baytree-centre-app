import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import User from "../Models/user.model";
import passportLocal from "passport-local";
// import passportJWT from "passport-jwt";
import jwt from "jsonwebtoken";

const LocalStrategy = passportLocal.Strategy;

const strategize = (passport: any) => {
  passport.serializeUser((user: any, done: any) => {
    done(undefined, user.id);
  });

  passport.deserializeUser((id: any, done: any) => {
    User.findById(id, (err: any, user: any) => {
      done(err, user);
    });
  });
  passport.use(
    "signIn",
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({
        email: email,
      }).then((user) => {
        //if email is not found
        if (!user) {
          return done(null, false, { message: "That email is not registered" });
        }

        // otherwise, compare password
        bcrypt.compare(password, user.password as string, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            const result = { id: user._id, email: user.email };
            return done(null, result, { message: "login successful" });
          } else {
            return done(null, false, { message: "Password incorrect" });
          }
        });
      });
    })
  );

  // More strategies go here ...
};

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  console.log("Validating Token...");
  // let token = req.headers.authorization?.split(" ")[1];
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "secret", (error: any, decoded: any) => {
      if (error) {
        return res.status(400).json({
          message: error.message,
          error,
        });
      } else if (decoded) {
        console.log("Validation Successful");
        next();
      }
    });
  } else {
    return res.status(401).json({
      message: "JWT is undefined",
    });
  }
};

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: "You are not signed in" });
  }
  verifyJWT(req, res, next);
};

export default { strategize, authenticate };
