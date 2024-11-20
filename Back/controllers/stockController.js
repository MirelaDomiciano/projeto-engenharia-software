const Stock = require("../models/stockModel");

const updateStock = async (req, res) => {
  try {
    const { productCode, quantity } = req.body;

    const stock = await Stock.getStock(productCode);
    if (!stock) {
      return res.status(400).json({ error: "Produto inexistente" });
    }

    const newStock = stock + quantity;
    await Stock.updateStock(productCode, newStock);
    res.status(200).json({ message: "Estoque atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar estoque:", error.message);
    res.status(500).json({ error: "Erro ao atualizar estoque" });
  }
};

const listStock = async (req, res) => {
  try {
    const stock = await Stock.listStock();
    res.status(200).json(stock);
  } catch (error) {
    console.error("Erro ao listar estoque:", error.message);
    res.status(500).json({ error: "Erro ao listar estoque" });
  }
};

module.exports = {
  updateStock,
  listStock,
};
