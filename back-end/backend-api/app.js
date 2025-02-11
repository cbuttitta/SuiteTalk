const express = require("express");
const cors = require("cors");
require('dotenv').config();
const db = require('db');

db.connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
});

const app = express();
app.use(cors());

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
