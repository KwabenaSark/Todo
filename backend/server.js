
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "  ",
  database: "  "
});

// Create
app.post("/todos", (req, res) => {
  const { task } = req.body;
  db.query("INSERT INTO todo (task) VALUES (?)", [task], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ id: result.insertId, task });
  });
});

// Read
app.get("/todos", (req, res) => {
  db.query("SELECT * FROM todo", (err, results) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(results);
  });
});

// Update
app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  db.query("UPDATE todo SET task = ? WHERE id = ?", [task, id], (err) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ id, task });
  });
});

// Delete
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM todo WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ id });
  });
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});




