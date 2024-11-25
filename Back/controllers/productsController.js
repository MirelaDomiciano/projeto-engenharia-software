const Product = require("../models/productsModel");
const Stock = require("../models/stockModel");
const Tracking = require("../models/trackingModel");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const listProducts = async (req, res) => {
  try {
    const { type, emailUser } = req.query; // Corrigido para desestruturar `type`
    let products = [];
    switch (parseInt(type)) {
      case 0:
        products = await Product.getProductsBuyer();
        break;
      case 1:
        products = await Product.getProductsSeller(emailUser);
        break;
      case 2:
        products = await Product.getProductsDeliverer();
        break;
      case 3:
        products = await Product.getProductsAdmin();
        break;
      default:
        return res.status(400).json({ error: "Tipo inválido" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("Erro ao listar produtos:", error.message);
    res.status(500).json({ error: "Erro ao listar produtos" });
  }
};

const buyProduct = async (req, res) => {
  try {
    const { productCode, emailUser, location, quantity } = req.body;

    const stock = await Stock.getStock(productCode);
    if (!stock || stock < quantity) {
      return res.status(400).json({ error: "Estoque insuficiente" });
    }

    const newStock = stock - quantity;
    await Stock.updateStock(productCode, newStock);
    await Tracking.addTracking(productCode, emailUser, location, quantity);

    res.status(200).json({ message: "Compra realizada com sucesso!" });
  } catch (error) {
    console.error("Erro ao comprar produto:", error.message);
    res.status(500).json({ error: "Erro ao comprar produto" });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, price, image, description, emailUser, quantity, location } =
      req.body;

    imageName = image.replace(/\s+/g, "_");
    const productCode = await Product.addProduct({
      name,
      price,
      imageName,
      description,
      emailUser,
    });

    await Stock.addStock(productCode, quantity, location);

    res.status(201).json({ message: "Produto adicionado com sucesso!" });
  } catch (error) {
    console.error("Erro ao adicionar produto:", error.message);
    res.status(500).json({ error: "Erro ao adicionar produto" });
  }
};

const uploadImage = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send("Nenhum arquivo enviado.");
    }

    const emailUser = req.body.emailUser;
    const tempPath = req.file.path;
    const fileName = req.file.originalname.replace(/\s+/g, "_");

    console.log(fileName, emailUser);
    const targetDir = path.join(process.env.UPLOAD, emailUser);

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
      console.log(`Pasta criada: ${targetDir}`);
    }

    const targetPath = path.join(targetDir, fileName);

    fs.rename(tempPath, targetPath, (err) => {
      if (err) {
        return res.status(500).send("Erro ao mover o arquivo.");
      }
      res.send(`Arquivo movido com sucesso! Nome: ${fileName}`);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const validateProduct = async (req, res) => {
  try {
    const { productCode } = req.body;

    await Product.validateProduct(productCode);

    res.status(200).json({ message: "Produto validado com sucesso!" });
  } catch (error) {
    console.error("Erro ao validar produto:", error.message);
    res.status(500).json({ error: "Erro ao validar produto" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productCode } = req.body;
    await Product.deleteProduct(productCode);

    await Stock.deleteProductStock(productCode);
    res.status(200).json({ message: "Produto excluído com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir produto:", error.message);
    res.status(500).json({ error: error.message || "Erro ao excluir produto" });
  }
};

module.exports = {
  listProducts,
  buyProduct,
  addProduct,
  validateProduct,
  uploadImage,
  deleteProduct,
};
