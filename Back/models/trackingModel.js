const mysql = require("../config/mysql");

const Tracking = {
  addTracking: async (productCode, emailUser, location, quantity) => {
    const lastUpdate = new Date();
    const randomDays = Math.floor(Math.random() * 30) + 1;
    const forecast = new Date(lastUpdate);
    forecast.setDate(forecast.getDate() + randomDays);
    await mysql.query(
      "INSERT INTO tracking (productCode, emailUser, status, location, lastUpdate, forecast, quantity) VALUES (?, ?, 0, ?, ?, ?, ?)",
      [productCode, emailUser, location, lastUpdate, forecast, quantity]
    );
  },

  listTrackedByUser: async (emailUser) => {
    const [rows] = await mysql.query(
      "SELECT * FROM tracking WHERE emailUser = ?",
      [emailUser]
    );
    return rows;
  },

  listAllTracking: async () => {
    const [rows] = await mysql.query("SELECT * FROM tracking");
    return rows;
  },

  updateTracking: async (productCode, status, location, emailUser) => {
    const lastUpdate = new Date();
    await mysql.query(
      "UPDATE tracking SET status = ?, location = ?, lastUpdate = ? WHERE productCode = ? AND emailUser = ?",
      [status, location, lastUpdate, productCode, emailUser]
    );
  },
};

module.exports = Tracking;
