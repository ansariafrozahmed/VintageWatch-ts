const express = require("express");
const cors = require("cors");
const app = express();

// Routes
const user = require("./routes/user");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/api", user);

app.listen(4000, () => console.log("BACKEND RUNNING ON 4000"));
