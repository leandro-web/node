const express = require("express");
const router = express.Router();
const db = require("../db");

// Create a new user
router.post("/", (req, res) => {
  const { name, email, age } = req.body;
  db.query(
    "INSERT INTO users (name, email, age) VALUES (?, ?, ?)",
    [name, email, age],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, name, email, age });
    }
  );
});

// READ (all)
router.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

// READ (one)
router.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM users WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send(result[0]);
    }
  );
});

// UPDATE
router.put("/:id", (req, res) => {
  const { name, email, age } = req.body;
  db.query(
    "UPDATE users SET name=?, email=?, age=? WHERE id=?",
    [name, email, age, req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send({ id: req.params.id, name, email, age });
    }
  );
});

// DELETE
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM users WHERE id=?", [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Usuário removido" });
  });
});

module.exports = router;
