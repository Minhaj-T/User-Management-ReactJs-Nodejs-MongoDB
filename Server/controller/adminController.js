const asyncHandler = require('express-async-handler');
const Admin = require('../models/adminmodel');
const generateToken = require('../utils/generateTocken');
const validateLoginForm = require('../validation/login');

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { errors, isValid } = validateLoginForm(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const admin = await Admin.findOne({ email });
  if (admin) {
    let notMatch = await admin.matchPassword(password);
    if (notMatch) {
      res.json({
        _id: admin._id,
        name: admin.email,
        password: admin.password,
        token: generateToken(admin._id),
      });
    } else {
      errors.password = 'Password inccorrest';
      res.status(400).json(errors);
    }
  } else {
    errors.email = 'Email not found';
    res.status(400).json(errors);
  }
});

module.exports = { authAdmin };
