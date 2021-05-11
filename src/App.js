import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";

import Navbar from "./components/Nav.component";
import Login from "./components/Login.component";
import Register from "./components/Register.component";
import ToDo from "./components/ToDo.component";
import Account from "./components/Account.component";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Route path="/" exact component={() => <Login />} />

      <Route path="/register" exact component={Register} />

      <Route path="/account" exact component={() => <Account />} />

      <Route path="/todo" exact component={() => <ToDo />} />
    </Router>
  );
}

export default App;
