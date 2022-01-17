import jwt from "jsonwebtoken";
import config from "config";

// token
const TOKEN_KEY = config.get("TOKEN_KEY");

const verifyToken = (req, res, next) => {
  const token = req.body.token;
  if (!token) {
    // return res.render("login");
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export default verifyToken;
