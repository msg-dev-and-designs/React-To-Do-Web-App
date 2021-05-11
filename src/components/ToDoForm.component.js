import React, { useState } from "react";
import axios from "axios";

const ToDoFrom = (props) => {
  //This get the current to date so when the duedate is clicked it will automatically start at todays date
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth();
  let year = today.getFullYear();
  today = year + "-" + month + "-" + day;

  const [task, setTask] = useState("");
  const [catagory, setCatagory] = useState("");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState("");

  //Creates a todo and sends a post request to update the db
  const handleSubmit = (event) => {
    event.preventDefault();
    const todo = {
      userID: localStorage.getItem("userLogged"),
      task: task.toLowerCase(),
      catagory: catagory.toLowerCase(),
      priority: priority.toLowerCase(),
      duedate: date,
    };
    axios
      .post("http://localhost:5000/todos/add", todo)
      .then((res) => props.setTodos([...props.todos, res.data]))
      .catch((error) => {
        console.log(error);
      });
    event.target.reset();
  };
  return (
    <div className="todo-form-wrapper">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Task</label>
          <input
            type="text"
            placeholder="Task name..."
            onChange={(e) => setTask(e.target.value)}
            autoFocus
            required
          />

          <label>Catagory</label>
          <select required onChange={(e) => setCatagory(e.target.value)}>
            <option disabled selected value>
              Select
            </option>
            <option value="School">School</option>
            <option value="Work">Work</option>
            <option value="Exercise">Exercise</option>
            <option value="House Chores">House Chores</option>
            <option value="Other">Other</option>
          </select>

          <label>Priority</label>
          <select required onChange={(e) => setPriority(e.target.value)}>
            <option disabled selected value>
              Select
            </option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <label>Due Date</label>
          <input
            type="date"
            min={today}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <button>Create</button>
        </div>
      </form>
    </div>
  );
};

export default ToDoFrom;
