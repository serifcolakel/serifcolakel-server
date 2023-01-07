import jwt from "jsonwebtoken";
import { RESULT } from "../common/constants";

export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).send({
      result: RESULT.ACCESS_DENIED,
      message: "No token provided",
    });

  try {
    const verified = jwt.verify(
      token.split(" ")[1],
      process.env.SECRET_KEY,
      (err, decoded) => {
        if (err) {
          return res.status(400).send({
            result: RESULT.INVALID_CREDENTIALS,
            message: "Token is expired or invalid",
            ...err,
          });
        }
        return decoded;
      }
    );

    req.body.userId = verified._id;
    next();
  } catch (error) {
    res.status(400).send({
      result: RESULT.ERROR,
      message: 'Something went wrong',
    });
  }
};
