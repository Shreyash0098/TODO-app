const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    // const error = new Error("Not authorized");
    // throw error;
    res.status(401).json({ message: "Not authorized" });
  }
  const token = authHeader.replace("Bearer ", "");
  let decodedtoken;
  try {
    decodedtoken = jwt.verify(token, "ifyouknowyouknow");
    // console.log(decodedtoken);
  } catch (err) {
    console.log(err);
  }
  if (!decodedtoken) {
    // const error = new Error("Not authorized");
    // throw error;
    res.status(401).json({ message: "Not authorized" });
  }

  req.userId = decodedtoken.userId;
  next();
};
