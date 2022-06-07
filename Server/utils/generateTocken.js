const jwt = require("jsonwebtoken");
//sign Token
const generateTocken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = generateTocken;
