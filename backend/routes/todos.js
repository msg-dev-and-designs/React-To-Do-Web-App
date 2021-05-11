const router = require("express").Router();
let Todo = require("../models/todo.model");

//Get all the todos in the db
router.route("/todos").get((req, res) => {
  Todo.find()
    .then((todos) => res.json(todos))
    .catch((err) => res.status(400).json("Error: " + err));
});

//Grabs the todo info from the body to create and save a new todo to the db
router.route("/add").post((req, res) => {
  const userID = req.body.userID;
  const task = req.body.task;
  const catagory = req.body.catagory;
  const priority = req.body.priority;
  const duedate = req.body.duedate;

  const newTodo = new Todo({
    userID,
    task,
    catagory,
    priority,
    duedate,
  });

  newTodo
    .save()
    .then((todos) => res.json(todos))
    .catch((err) => res.status(400).json("Error: " + err));
});

//Find a todo associated with an id and deletes the todo
router.route("/:id").delete((req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .then((todos) => res.json(todos))
    .catch((err) => res.status(400).json("Error: " + err));
});

//Find all todos associated with a user id and deletes all of them
//used when the user deletes their account. 
router.route("/delete/:id").delete((req, res) => {
  Todo.deleteMany({ userID: req.params.id }).catch((err) =>
    res.status(400).json("Error: " + err)
  );
});

module.exports = router;
