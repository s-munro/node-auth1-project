const db = require("../../database/dbConfig");

module.exports = {
  add,
  findById,
  findBy,
  find,
};

async function add(user) {
  const [id] = await db("users").insert(user);
  return db("users").where("id", id);
}
function findById(id) {
  return db("users").where("id", id).first();
}

function findBy(username) {
  return db("users").where(username).orderBy("id");
}
function find() {
  return db("users");
}
