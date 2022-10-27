require("dotenv").config();
const express = require("express");
const app = express();
const credentials = require("./middleware/credentials");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connection = require("./db");

// database connection
connection();

// check credentials before CORS
app.use(credentials);

// middlewares
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use(cors(corsOptions));

// routes

app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/car", require("./routes/car"));

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
