const express = require("express");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

// cost usersRouter = require('./users/users-router.js');
const authRouter = require("./auth/auth-router");
const server = express();

server.use(express.json());
server.use(
  session({
    name: "banana", // the default would be sid, but that would reveal our stack
    secret: "top secreto", // to encrypt/decrypt the cookie
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false,
      httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,

    store: new KnexSessionStore({
      knex: require("../database/dbConfig.js"),
      tablename: "sessions",
      sidfieldname: "sid",
      createtable: true,
      clearInterval: 1000 * 60 * 60,
    }),
  })
);

server.use("/api", authRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
