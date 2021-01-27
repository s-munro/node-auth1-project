const express = require("express");
const Users = require("../users/users-model");
const bcrypt = require("bcryptjs");
const router = express.Router();
const protected = require("./auth-middleware");

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

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const allegedUser = await Users.findBy({ username }).first();
    if (allegedUser && bcrypt.compareSync(password, allegedUser.password)) {
      req.session.user = allegedUser;
      console.log(req.session);
      res.json("welcome back baybeee");
    } else {
      res.status(401).json("invalid credentials");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get("/logout", (req, res) => {
  res.status(204).json({ message: "silly response" });
});

router.get("/users", protected, (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
