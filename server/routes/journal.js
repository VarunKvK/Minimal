const express = require("express");
const journalRoute = express.Router();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const Journal = require("../models/Journal");
journalRoute
  .route("/journal")

  .get(async (req, res) => {
      const { UserToken } = req.cookies;
    try {
      if (UserToken) {
        jwt.verify(UserToken, jwtSecret, {}, async (err, token) => {
          if (err) throw err;
          if (!token) {
            res.status(400).json({ message: "Token not found" });
          }
          const tokenId = token.id;
          const journals = await Journal.find({ user: tokenId });
          if (journals) {
            res.json(journals);
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  })
  .post(async (req, res) => {
    const { text,formattedTimestamp } = req.body;
    const { UserToken } = req.cookies;
    if (UserToken) {
        jwt.verify(UserToken, jwtSecret, {}, async (err, token) => {
            if (err) throw err;
            if (!token) {
                res.status(400).json({ message: "Token not found" });
            }
            await Journal.create({
                user: token.id,
                journaltitle: text.journalTitle,
                journal: text.journal,
                timestamp: formattedTimestamp
              });
      });
    }
  });

module.exports = journalRoute;
