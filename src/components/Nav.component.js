import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  //If the user clicks logout the localStorage item will be deleted
  //The user will be sent to the login page
  const LogoutHandler = () => {
    localStorage.removeItem("userLogged");
    window.location.reload();
  };

  //Used to verfiy if a use is logged in or not
  //If an item is found in the localStorage the navbad will show the proper links for a logged in user
  //Else it will only show login and create account
  const isLoggedIn = () => {
    if (localStorage.getItem("userLogged")) {
      return (
        <header>
          <nav className="navbar">
            <h1 id="logo">To-Do Application</h1>
            <ul className="nav-links">
              <li>
                <Link to="/todo">Todos</Link>
              </li>
              <li>
                <Link to="/account">Account</Link>
              </li>
              <li>
                <Link to="/" onClick={LogoutHandler}>
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
        </header>
      );
    } else {
      return (
        <header>
          <nav className="navbar">
            <h1 id="logo">To-Do Application</h1>
            <ul className="nav-links">
              <li>
                <Link to="/">Login</Link>
              </li>
              <li>
                <Link to="/register">Create Account</Link>
              </li>
            </ul>
          </nav>
        </header>
      );
    }
  };

  return isLoggedIn();
};

export default Navbar;
