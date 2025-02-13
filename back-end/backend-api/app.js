const express = require("express");
const cors = require("cors");
require('dotenv').config();
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const pool = new Pool({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 5432, // Default PostgreSQL port
  
});

const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

const apartments = [
    "The Edge",
    "University Walk",
    "University Crossing",
    "The Mill",
    "University Village",
  ];

//Routes:
app.get("/", function (req, res) {
    console.log("got request from ", req.url);
    const queries = req.query;
    if(queries.query === undefined){
        next();
    }
    const query = queries.query;
    if(query == "apartments"){
        res.json(apartments);
    }
    else{
        res.send("Invalid query");
    }
});

// Login Routes

// **User Login**
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// **Protected Route**
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Access denied" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });

    req.user = user;
    next();
  });
};

app.get("/profile", authenticateToken, (req, res) => {
  res.json({ message: "Profile data", user: req.user });
});

// API Route: Insert a New User
app.post("/signup ", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the email already exists
    const emailExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (emailExists.rows.length > 0) {
      return res.status(400).json({ error: "Email already in use" });
    }
    // Check if the username already exists
    const passwordExists = await pool.query("SELECT * FROM users WHERE password = $1", [email]);

    if (passwordExists.rows.length > 0) {
      return res.status(400).json({ error: "password already in use" });
    }
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert user into database
    const result = await pool.query(
      "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email, created_at",
      [username, email, hashedPassword]
    );
    const user = result.rows[0];

    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });

    res.status(201).json({ message: "User registered successfully", token, user });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
