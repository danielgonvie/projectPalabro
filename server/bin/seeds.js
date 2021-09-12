require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const bcryptSalt = 10;

mongoose
  .connect(`${process.env.DBURL}`, { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

let users = [
  {
    name: "Ductor",
    username: "ductor",
    password: bcrypt.hashSync("ductor", bcrypt.genSaltSync(bcryptSalt)),
    points: 1000
  },
  {
    name: "El pepe",
    username: "pepe",
    password: bcrypt.hashSync("pepe", bcrypt.genSaltSync(bcryptSalt)),
    points: 500
  },
  {
    name: "Cheems",
    username: "cheems",
    password: bcrypt.hashSync("cheems", bcrypt.genSaltSync(bcryptSalt)),
    points: 100
  },
  {
    name: "Cookie",
    username: "cookie",
    password: bcrypt.hashSync("cookie", bcrypt.genSaltSync(bcryptSalt)),
    points: 0
  }  
];

User.deleteMany()
  .then(() => {
    return User.create(users);
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
