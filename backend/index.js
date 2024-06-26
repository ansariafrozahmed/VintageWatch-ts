const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const user = require("./routes/user");
const listing = require("./routes/listing");
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
app.use("/api", listing);

app.get("/", (req, res) => {
  res.redirect("https://vintagewatch.vercel.app/");
});

app.listen(PORT, () => console.log(`BACKEND RUNNING ON ${PORT}`));
