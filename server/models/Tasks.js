const mongoose = require("mongoose");
const Users = require("./Users");

const taskSubdocument = new mongoose.Schema({
  name: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const taskSC = new mongoose.Schema({
  tasker: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tasktitle: { type: String, required: true },
  todo: [taskSubdocument]
});

const Task = new mongoose.model("Task", taskSC);

module.exports = Task;
