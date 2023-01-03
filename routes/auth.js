import express from "express";
import User from "../models/User.js";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

const registerSchema = Joi.object({
  name: Joi.string().min(6).max(255).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 6 characters",
    "string.max": "Name must be at most 255 characters",
  }),
  email: Joi.string()
    .email()
    .required("Email is must be valid & unique")
    .messages({
      "string.empty": "Email is required",
      "string.email": "Email must be valid",
    }),
  about: Joi.string().required().messages({
    "string.empty": "About is required",
  }),

  password: Joi.string().min(6).max(1024).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
    "string.max": "Password must be at most 1024 characters",
  }),

  avatar: Joi.string().default("https://i.hizliresim.com/mn8lcf9.jpg"),
});

authRouter.post("/register", (req, res) => {
  const { email, name, password, about, avatar } = req.body;

  const { error } = registerSchema.validate({
    ...req.body,
  });
  if (error) {
    return res.status(400).json({
      title: "Validation Error",
      message: error.details[0].message,
      ...error,
    });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const newUser = new User({
    email,
    name,
    password: hashedPassword,
    about,
    avatar,
  });

  newUser
    .save()
    .then((user) => res.status(200).json({
      title: "User created",
      message: "User created successfully",
      user,
    }))
    .catch((error) => {
      let errMsg;
      if (error.code == 11000 && error.keyPattern.email) {
        errMsg = Object.keys(error.keyValue)[0] + " already exists.";
      } else {
        errMsg = error.message;
      }
      res.status(400).json({ statusText: "Bad Request", message: errMsg });
    });
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is must be valid & unique",
    "string.email": "Email must be valid",
  }),
  password: Joi.string().min(6).max(1024).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
    "string.max": "Password must be at most 1024 characters",
  }),
});

authRouter.post("/login", (req, res) => {
  const { email, password } = req.body;

  const { error } = loginSchema.validate({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({
      title: "Validation Error",
      message: error.details[0].message,
      // ...error,
    });
  }

  User.findOne({ email })
    .then((user) => {
      const { _id, name, email, about, avatar } = user;
      if (!user) {
        return res.status(402).json({
          title: "Kullanıcı Bulunamadı",
          message: "Lütfen bilgilerinizi kontrol ediniz",
        });
      }

      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          title: "Kullanıcı adı veya şifre hatalı",
          message: "Lütfen kullanıcı adınızı ve şifrenizi kontrol ediniz",
        });
      }

      const accessToken =
        "Bearer " +
        jwt.sign(
          {
            _id,
            name,
            email,
            about,
            avatar,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );

      return res.header("Authorization", accessToken).json({
        accessToken,
      });
    })
    .catch((error) =>
      res.status(400).json({
        title: "Şuanda işleminizi gerçekleştiremiyoruz",
        message: error.message,
        // ...error,
      })
    );
});

export default authRouter;
