import jwt from "jsonwebtoken";
import "dotenv/config";

const genrateToken = (user_id) => {
  return jwt.sign({ _id: user_id }, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
  });
};

const verifyToken = (token) => {
  return jwt.decode(token);
};

export { genrateToken, verifyToken };
