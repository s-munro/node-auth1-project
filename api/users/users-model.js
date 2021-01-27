const db = require("../../database/dbConfig");

module.exports = {
  add,
  findById,
};

async function add(user) {
  const [id] = await db("users").insert(user);
  return db("users").where("id", id);
}
function findById(id) {
  return db("users").where("id", id).first();
}
