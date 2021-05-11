import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Login from "./Login.component";

const Account = () => {
  //I'm using useState here get the new password and the confirm password from the user.
  const [newPassword, setNewPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  //history will be used to route to a different url.
  let history = useHistory();

  //HandleSubmit prevents the form from doing the default submitting fuctionality.
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  //ValidatePassword make sure the password length has 8 or more characters and also checks to make sure the passwords match.
  //We then send a patch request with the use id to update the password for the user.
  const ValidatePassword = () => {
    if (newPassword.length >= 8 && confirmPass.length >= 8) {
      if (newPassword === confirmPass) {
        const password = {
          password: newPassword,
        };
        axios
          .patch(
            `http://localhost:5000/users/${localStorage.getItem("userLogged")}`,
            password
          )
          .then(alert("Password was successfully changed!"))
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("passwords did not match");
      }
    } else {
      alert("Password must have 8 or more characters");
    }
    history.push("/todo");
  };

  //DeleteHandler is used if a user wants to delete their account
  //A delete request containing the account id is sent
  //If the account is found, the account will then be deleted from the db
  //Sends a delete to get all associated to todos and delete them from the db
  //The user will be logged out and sent back to the login screen
  const DeleteHandler = () => {
    axios
      .delete(
        `http://localhost:5000/users/${localStorage.getItem("userLogged")}`
      )
      .catch((error) => {
        console.log(error);
      });
    axios
      .delete(
        `http://localhost:5000/todos/delete/${localStorage.getItem(
          "userLogged"
        )}`
      )
      .catch((error) => {
        console.log(error);
      });
    localStorage.removeItem("userLogged");
    window.location.reload();
  };

  //Used to verfiy if a use is logged in or not
  //If no item is found in the localStorage the user will be reverted back to login
  //Else the Account page will be shown for that specifc user
  const isLoggedIn = () => {
    if (localStorage.getItem("userLogged") === null) {
      history.push("/");
      return <Login />;
    } else {
      return (
        <div className="form-wrapper">
          <form className="form-login" onSubmit={handleSubmit}>
            <div className="login-details">
              <label>New Password:</label>

              <input
                type="password"
                id="new-password"
                placeholder="Your new password..."
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <label>Confirm Password:</label>
              <input
                type="password"
                id="confirm-password"
                placeholder="Confirm new password..."
                onChange={(e) => setConfirmPass(e.target.value)}
              />

              <button onClick={ValidatePassword}>Change Password</button>
              <button onClick={DeleteHandler}>Delete Account</button>
            </div>
          </form>
        </div>
      );
    }
  };

  return isLoggedIn();
};

export default Account;
