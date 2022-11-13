const jwt = require("jsonwebtoken");
require("dotenv").config();

const authToken = async (req, res, next) => {
  // Authenticate token
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decode = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decode.userId;
    req.token = token;
    next();
  } catch (error) {
    res.status(403).json({
      errors: [
        {
          msg: "token not found",
        },
      ],
    });
  }
};

module.exports = authToken;