const mysql = require("../config/mysql");

const Product = {
  getProductsBuyer: async () => {
    try {
      const rows = await mysql.query("SELECT * FROM products WHERE valid = 1");
      return rows[0];
    } catch (error) {
      throw error;
    }
  },
  getProductsSeller: async (emailUser) => {
    try {
      const rows = await mysql.query(
        "SELECT p.* FROM products p, users u WHERE p.emailUser=u.email AND p.emailUser = ?",
        [emailUser]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  getProductsDeliverer: async () => {
    try {
      const rows = await mysql.query(
        "SELECT p.* FROM products p INNER JOIN tracking t ON p.code = t.productCode"
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  getProductsAdmin: async () => {
    try {
      const rows = await mysql.query("SELECT * FROM products WHERE valid = 0");
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  addProduct: async ({ name, price, imageName, description, emailUser }) => {
    try {
      const [result] = await mysql.query(
        "INSERT INTO products (code, name, price, imageName, description, emailUser, valid) VALUES (NULL, ?, ?, ?, ?, ?, 0)",
        [name, price, imageName, description, emailUser]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  },

  validateProduct: async (productCode) => {
    try {
      const rows = await mysql.query(
        "UPDATE products SET valid = 1 WHERE code = ?",
        [productCode]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },

  deleteProduct: async (productCode) => {
    try {
      const [result] = await mysql.query(
        "DELETE FROM products WHERE code = ?",
        [productCode]
      );

      if (result.affectedRows === 0) {
        throw new Error("Produto não encontrado");
      }

      return result;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = Product;
