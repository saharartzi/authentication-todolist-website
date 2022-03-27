const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware

app.use(cors());
app.use(express.json());

//routes

app.use("/auth", require("./routs/jwAuth"));

app.use("/dashboard", require("./routs/dashboard"));

app.use("/friends", require("./routs/friends"));




app.listen(5000, () => {
  console.log(`Server is starting on port 5000`);
});
