import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ToDo from "./ToDo.component";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  //This is used to make sure the password given and the email are the proper length.
  const validateLogin = () => {
    return email > 3 && password >= 8;
  };

  //HandleSubmit prevents the default form submission
  //We are send the login credentials to the server
  //If the server sends back a specific user, the login was successful
  //We then set an item in local storage with the use id
  //The user will be redirected to /todo
  //Else we alert the user with the error
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:5000/users/login", data)
      .then((res) => {
        if (res.data.user) {
          localStorage.setItem("userLogged", res.data.user);
          console.log(res.data.user);
          history.push("/todo");
          window.location.reload();
        } else {
          alert(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Used to verfiy if a use is logged in or not
  //If an item is found in the localStorage the user will not be able to access the login page
  const isLoggedIn = () => {
    if (localStorage.getItem("userLogged")) {
      history.push("/todo");
      return <ToDo />;
    } else {
      return (
        <div className="form-wrapper">
          <form className="form-login" onSubmit={handleSubmit}>
            <div className="login-details">
              <label>Email</label>

              <input
                type="email"
                id="email"
                placeholder="Your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />

              <label>Password</label>
              <input
                type="password"
                placeholder="Your password..."
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button disabled={!validateLogin}>Login</button>
            </div>
          </form>
        </div>
      );
    }
  };
  return isLoggedIn();
};

export default Login;

