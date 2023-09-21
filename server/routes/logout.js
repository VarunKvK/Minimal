const express = require("express");
const logoutRoute = express.Router();

logoutRoute
  .route("/logout")

  .post((req, res) => {
    res
      .cookie("UserToken", "", {
        expires: new Date(0),
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .json(true);
  });

module.exports = logoutRoute;
