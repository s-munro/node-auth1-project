const express = require("express");
const Users = require("../users/users-model");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: "thats a miss-steak" });
  } else {
    const hashed = bcrypt.hashSync(password, 10);
    Users.add({ username, password: hashed })
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  }
});

router.post("/login", (req, res) => {
  res.status(200).json({ message: "silly response" });
});

router.get("/logout", (req, res) => {
  res.status(204).json({ message: "silly response" });
});

module.exports = router;
