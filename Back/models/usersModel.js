const mysql = require("../config/mysql");

const User = {
  getUserByEmail: async (email) => {
    try {
      const rows = await mysql.query("SELECT * FROM users WHERE email = ?", [
        email,
      ]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  createUser: async ({ name, email, password, address, type }) => {
    try {
      await mysql.query(
        "INSERT INTO users (name, email, password, address, type) VALUES (?, ?, ?, ?, ?)",
        [name, email, password, address, type]
      );
    } catch (error) {
      throw error;
    }
  },
};

module.exports = User;
