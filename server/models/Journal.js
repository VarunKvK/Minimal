const mongoose = require("mongoose");
const Users = require("./Users");

const journalSC = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  journaltitle: { type: String, required: true },
  journal: { type: String, required: true },
  timestamp: { type: String }
});

const Journal = new mongoose.model("Journal", journalSC);

module.exports = Journal;
