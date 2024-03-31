const express = require("express");
const cors = require("cors");
const app = express();

// Routes
const user = require("./routes/user");
const PORT = 4000;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://vintagewatch.vercel.app"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/api", user);

app.listen(PORT, () => console.log(`BACKEND RUNNING ON ${PORT}`));
