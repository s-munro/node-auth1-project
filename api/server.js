const express = require("express");
const session = require("express-session");

// cost usersRouter = require('./users/users-router.js');
const authRouter = require("./auth/auth-router");
const server = express();

server.use(express.json());

server.use("/api", authRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
