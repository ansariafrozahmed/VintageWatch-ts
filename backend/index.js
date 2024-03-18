const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

//User Signup Api
app.post("/api/userSignup", async (req, res) => {
  const { first_name, last_name, email, password, city } = req.body;
  try {
    //Hashing The Password
    const hashedPassword = await bcrypt.hash(password, 10);
    //Check email exist or not
    const existingUser = await pool.query(
      `SELECT * FROM vwuser WHERE user_email = $1`,
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "Email already exists. Choose a different email." });
    }
    //Query
    const adduserquery =
      "INSERT INTO vwuser (user_first_name,user_last_name,user_email,user_password,user_city) VALUES ($1, $2,$3,$4,$5) RETURNING *";
    const values = [first_name, last_name, email, hashedPassword, city];

    const result = await pool.query(adduserquery, values);

    res.status(200).send("Success!!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

//User Login Api
app.post("/api/userSignin", async (req, res) => {
  const { email, password } = req.body;

  // Query to retrieve user by email
  try {
    const getUserQuery = `SELECT * FROM vwuser WHERE user_email = '${email}';`;
    const userResult = await pool.query(getUserQuery);

    if (userResult.rows.length === 0) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const storedHashedPassword = userResult.rows[0].user_password;

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, storedHashedPassword);

    if (!passwordMatch) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    // Return user data upon successful login
    const userData = {
      id: userResult.rows[0].user_id,
      first_name: userResult.rows[0].user_first_name,
      last_name: userResult.rows[0].user_last_name,
      email: userResult.rows[0].user_email,
      city: userResult.rows[0].user_city,
      role: userResult.rows[0].user_role,
    };

    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//GET User Data By ID Api
app.get("/api/getUserProfileData/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const query =
      "SELECT user_id, user_first_name, user_last_name, user_email, user_profile_picture, user_city, user_phone_code, user_phone_number, user_eligible_for_listing, user_created_at, user_updated_at FROM vwuser WHERE user_id = $1;";
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).send({ error_message: "User not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching user profile data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(4000, () => console.log("BACKEND RUNNING ON 4000"));
