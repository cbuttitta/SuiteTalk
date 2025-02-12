const express = require("express");
const cors = require("cors");
require('dotenv').config();
const { Pool } = require("pg");
const bcrypt = require("bcrypt");

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

//Get: Authenticates login credentials
app.login("/login", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM items");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Post: Creates a new login when signing up
app.post("/login", async (req, res) => {
  const { name } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO items (name) VALUES ($1) RETURNING *",
      [name]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
