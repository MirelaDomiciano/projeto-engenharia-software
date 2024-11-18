const mysql = require("../config/mysql");

const User = {
  getUser: async (email, password) => {
    const rows = await mysql.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );
    return rows[0];
  },
};

module.exports = User;
