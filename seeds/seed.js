const db = require("../config/connection");
const { User, Thought } = require("../models");
const cleanDB = require("./cleanDB");

const thoughtData = require("./thoughtData.json");
const userData = require("./userData.json");

db.once("open", async () => {
  await cleanDB("Thought", "thoughts");
  await cleanDB("User", "users");

  await User.create(userData);
  await Thought.create(thoughtData);

  console.log("User and Thought DB seeded");
  process.exit(0);
});