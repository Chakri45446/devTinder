const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Check firstName or lastName enterd or not");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not Valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please Enter a Strong Password");
  }
};

const valiadteEditProfileData = (req) => {
  const ALLOWEDEDITDATA = [
    "firstName",
    "lastName",
    "skills",
    "photoUrl",
    "about",
    "age",
    "gender",
  ];

  const isAllowedData = Object.keys(req.body).every((key) =>
    ALLOWEDEDITDATA.includes(key)
  );
  return isAllowedData;
};

const validateForgotPassword = (req) => {
  const NEWPASSWORD = ["password"];

  const isPassword = Object.keys(req.body).every((k) =>
    NEWPASSWORD.includes(k)
  );
  return isPassword;
};
module.exports = {
  validateSignUpData,
  valiadteEditProfileData,
  validateForgotPassword,
};
