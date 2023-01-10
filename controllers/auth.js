import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import fs from "fs";

import { loginSchema, registerSchema } from "../utils/authUtil.js";
import { RESULT } from "../common/constants.js";

import User from "../models/User.js";

export const handleRegister = (req, res) => {
  const { email, name, password, about, image } = req.body;

  const { error } = registerSchema.validate({
    ...req.body,
  });
  if (error) {
    fs.unlinkSync(`public${image}`);

    return res.status(400).json({
      result: RESULT.VALIDATION_ERROR,
      message: error.details[0].message.replace(/"/g, ""),
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
    image,
  });

  newUser
    .save()
    .then((user) =>
      res.status(200).json({
        result: RESULT.SUCCESS,
        message: "User created successfully",
        user,
      })
    )
    .catch((error) => {
      fs.unlinkSync(`public${image}`);

      let errMsg;

      if (error.code == 11000 && error.keyPattern.email) {
        errMsg = Object.keys(error.keyValue)[0] + " already exists.";
      } else {
        errMsg = error.message;
      }

      res.status(400).json({ result: RESULT.ERROR, message: errMsg });
    });
};

export const handleLogin = (req, res) => {
  const { email, password } = req.body;

  const { error } = loginSchema.validate({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({
      result: RESULT.VALIDATION_ERROR,
      message: error.details[0].message.replace(/"/g, ""),
      // ...error,
    });
  }

  User.findOne({ email })
    .then((user) => {
      const { _id, name, email, about, image } = user;
      if (!user) {
        return res.status(402).json({
          result: RESULT.ERROR,
          message: "Lütfen bilgilerinizi kontrol ediniz",
        });
      }

      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          result: RESULT.ERROR,
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
            image,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );

      return res.header("Authorization", accessToken).json({
        result: RESULT.SUCCESS,
        message: "Login successful!",
        accessToken,
      });
    })
    .catch((error) =>
      res.status(400).json({
        result: RESULT.ERROR,
        message: error.message || "Şuanda işleminizi gerçekleştiremiyoruz",
        // ...error,
      })
    );
};
