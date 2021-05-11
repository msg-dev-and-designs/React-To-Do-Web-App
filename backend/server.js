const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
require("./config/passport");

app.use(cors());
app.use(express.json());

//Connects us to our mongo database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

//Sends a confirmation once connected
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database is connected.");
});


app.use(passport.initialize());
app.use(passport.session());

//Routes for the app
const todoRouter = require("./routes/todos");
const usersRouter = require("./routes/users");
app.use("/todos", todoRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
