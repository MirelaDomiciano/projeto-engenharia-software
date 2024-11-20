const mysql = require("../config/mysql");

const Stock = {
  getStock: async (productCode) => {
    const [rows] = await mysql.query(
      "SELECT quantity FROM stock WHERE productCode = ?",
      [productCode]
    );
    return rows[0]?.quantity || 0;
  },

  updateStock: async (productCode, quantity) => {
    await mysql.query("UPDATE stock SET quantity = ? WHERE productCode = ?", [
      quantity,
      productCode,
    ]);
  },

  listStock: async () => {
    const [rows] = await mysql.query("SELECT * FROM stock");
    return rows;
  },

  addStock: async (productCode, quantity, location) => {
    const rows = await mysql.query(
      "INSERT INTO stock (productCode, quantity, location) VALUES (?, ?, ?)",
      [productCode, quantity, location]
    );
    return rows;
  },

  deleteProductStock: async (productCode) => {
    try {
      const [result] = await mysql.query("DELETE FROM stock WHERE code = ?", [
        productCode,
      ]);

      if (result.affectedRows === 0) {
        throw new Error("Produto não encontrado");
      }

      return result;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = Stock;
