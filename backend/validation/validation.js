const { body } = require("express-validator");

exports.validateTask = () => [
  body("title", "title must be at least 3 char.")
    .isLength({ min: 3 })
    .trim()
    .notEmpty(),
  body("description", "Max character limit is 25")
    .isLength({ max: 25 })
    .trim()
    .notEmpty()
    .custom((value, { req }) => {
      if (value === "test") {
        throw new Error("this description is forbidden");
      }
      return true;
    }),
];

exports.validateSignupUser = () => [
  body("password", "password must be at least 3 char.")
    .isLength({ min: 6 })
    .trim()
    .notEmpty(),
  body("email", "Max character limit is 25")
    .isLength({ max: 25 })
    .trim()
    .notEmpty()
    .custom((value, { req }) => {
      if (value === "test@gmail.com") {
        throw new Error("this description is forbidden");
      }
      return true;
    }),
];
