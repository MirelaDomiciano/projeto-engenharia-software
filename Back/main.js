const express = require("express");
const cors = require("cors");
let app = express();
app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/usersRoutes");

const port = process.env.PORT;
require("dotenv").config();

app.use(userRoutes);

let server = app.listen(port, function () {
  console.log("Asthon REST API listening on port %s", port);
});
