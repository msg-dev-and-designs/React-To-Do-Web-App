const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    userID: { type: String, required: true },
    task: { type: String, required: true },
    catagory: { type: String, required: true },
    priority: { type: String, required: true },
    duedate: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
