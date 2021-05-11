import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ToDoForm from "./ToDoForm.component";
import Search from "./Search.component";
import Login from "./Login.component";

const ToDo = (props) => {
  const [todos, setTodos] = useState([]);
  let history = useHistory();
  //UseEffect allows us to update the todos when the user creates a new todo.
  //send a get request grabbing the updated list.
  useEffect(() => {
    axios
      .get("http://localhost:5000/todos/todos")
      .then((res) => setTodos(res.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //This sends a delete request with the todo id and then deletes the todo from the db
  //We then filter the todo array removing the todo with that specific id
  const DeleteHandler = (event) => {
    const id = event.target.name;
    axios.delete(`http://localhost:5000/todos/${id}`).catch((error) => {
      console.log(error);
    });
    const update = todos.filter((e) => e._id != id);
    setTodos(update);
  };

  //this uses the event target id and a switch statement to sort the table accordingly.
  //based on what table header was clicked we use sort with a comparsion to sort the todos and update the table.
  const SortHandler = (event) => {
    let prop = event.target.id;
    let sorted;

    switch (prop) {
      case "task":
        sorted = [...todos].sort((a, b) => {
          if (a.task < b.task) {
            return -1;
          }
          if (a.task > b.task) {
            return 1;
          }
          return 0;
        });
        break;

      case "priority":
        sorted = [...todos].sort((a, b) => {
          if (a.priority < b.priority) {
            return -1;
          }
          if (a.priority > b.priority) {
            return 1;
          }
          return 0;
        });
        break;

      case "catagory":
        sorted = [...todos].sort((a, b) => {
          if (a.catagory < b.catagory) {
            return -1;
          }
          if (a.catagory > b.catagory) {
            return 1;
          }
          return 0;
        });
        break;

      case "due-date":
        sorted = [...todos].sort((a, b) => {
          if (a.duedate < b.duedate) {
            return -1;
          }
          if (a.duedate > b.duedate) {
            return 1;
          }
          return 0;
        });
        break;
    }
    setTodos(sorted);
  };

  //Used to verfiy if a use is logged in or not
  //If an item is not found in local stoarge the user will be reverted to login
  //Else the todo page will show with the associated users todos
  const isLoggedIn = () => {
    if (localStorage.getItem("userLogged") === null) {
      history.push("/");
      return <Login />;
    } else {
      return (
        <div className="todo-table-wrapper">
          <div>
            <ToDoForm
              loggedUser={props.loggedUser}
              setTodos={setTodos}
              todos={todos}
            />
          </div>
          <div>
            <Search setTodos={setTodos} todos={todos} />
            <table>
              <thead>
                <th className="th-sort" id="task" onClick={SortHandler}>
                  Task
                </th>
                <th className="th-sort" id="catagory" onClick={SortHandler}>
                  Catagory
                </th>
                <th className="th-sort" id="priority" onClick={SortHandler}>
                  Priority
                </th>
                <th className="th-sort" id="due-date" onClick={SortHandler}>
                  Due Date
                </th>
                <th id="controls">Controls</th>
              </thead>
              {todos.map((todo) => {
                if (todo.userID === localStorage.getItem("userLogged")) {
                  return (
                    <tbody>
                      <tr>
                        <td>{todo.task}</td>
                        <td>{todo.catagory}</td>
                        <td>{todo.priority}</td>
                        <td>{todo.duedate}</td>
                        <td>
                          <button
                            className="table-button"
                            name={todo._id}
                            onClick={DeleteHandler}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  );
                }
              })}
            </table>
          </div>
        </div>
      );
    }
  };

  return isLoggedIn();
};

export default ToDo;
