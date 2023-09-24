const mongoose = require("mongoose");
const Users = require("./Users");

const taskSC = new mongoose.Schema({
  tasker: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tasktitle: { type: String, required: true },
  todo: [
    {
      name: { type: String, required: true },
      completed: { type: Boolean, default: false },
    },
  ],
});

const Task = new mongoose.model("Task", taskSC);

module.exports = Task;
