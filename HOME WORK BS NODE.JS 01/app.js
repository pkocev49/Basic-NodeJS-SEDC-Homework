// let colors = require("colors");
let users = [
  {
    role: "admin",
    fullname: "John Doe",
    username: "qwerty",
    password: "123qwe",
  },
  {
    role: "client",
    fullName: "Bob Bobski",
    username: "asdasd",
    password: "zxczxc",
  },
];

function userVal(username, password) {
  for (let user of users) {
    if (username === user.username) {
      console.log("User is logged in".green);
    } else console.log("User not found".yellow);
    if (password === user.password) {
      console.log("Password found".green);
    } else console.log("No match".red);
  }
}

userVal("qswerty", "123");
