import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ToDo from "../components/ToDo.component";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  let history = useHistory();

  //createAccount creates a user based on the information given and send a post request with that user
  //The user will then be added to the db.
  const createAccount = () => {
    const user = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:5000/users/register", user)
      .then((res) => {
        if (res.data === "success") {
          history.push("/");
        } else {
          alert(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //This make sure all the fields are filled out with the proper amount information to create an account
  //It will test to make sure password and confirm password match.
  const validateAccount = () => {
    if (
      firstName.length > 1 &&
      lastName.length > 1 &&
      email.length > 0 &&
      password.length >= 8 &&
      confirmPass.length >= 8
    ) {
      if (password === confirmPass) {
        createAccount();
      } else {
        alert("passwords did not match");
      }
    } else {
      alert("Fill out all fields. Password must have 8 or more characters");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const isLoggedIn = () => {
    if (localStorage.getItem("userLogged")) {
      history.push("/todo");
      return <ToDo />;
    } else {
      return (
        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email</label>
              <input
                type="email"
                id="email"
                value={email}
                placeholder="Your email...."
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                required
              />

              <label>First Name</label>
              <input
                type="text"
                id="first-name"
                value={firstName}
                placeholder="Your first name...."
                onChange={(e) => setFirstName(e.target.value)}
                required
              />

              <label>Last Name</label>
              <input
                type="text"
                id="last-name"
                value={lastName}
                placeholder="Your last name...."
                onChange={(e) => setLastName(e.target.value)}
                required
              />

              <label>Password</label>
              <input
                type="password"
                id="password"
                value={password}
                placeholder="Your password...."
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <label>Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPass}
                placeholder="Confirm password...."
                onChange={(e) => setConfirmPass(e.target.value)}
                required
              />

              <button type="submit" onClick={validateAccount}>
                Create Account
              </button>
            </div>
          </form>
        </div>
      );
    }
  };

  return isLoggedIn();
};

export default Register;
