const Tracking = require("../models/trackingModel");

const listTrackedByUser = async (req, res) => {
  try {
    const { emailUser } = req.query;

    const trackedProducts = await Tracking.listTrackedByUser(emailUser);
    res.status(200).json(trackedProducts);
  } catch (error) {
    console.error("Erro ao listar rastreamentos:", error.message);
    res.status(500).json({ error: "Erro ao listar rastreamentos" });
  }
};

const updateTracking = async (req, res) => {
  try {
    const { productCode, status, location, emailUser } = req.body;

    await Tracking.updateTracking(productCode, status, location, emailUser);

    res.status(200).json({ message: "Rastreamento atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar rastreamento:", error.message);
    res.status(500).json({ error: "Erro ao atualizar rastreamento" });
  }
};

const listAllTracking = async (req, res) => {
  try {
    const trackingData = await Tracking.listAllTracking();
    res.status(200).json(trackingData);
  } catch (error) {
    console.error("Erro ao listar todos os rastreamentos:", error.message);
    res.status(500).json({ error: "Erro ao listar rastreamentos" });
  }
};

module.exports = {
  listTrackedByUser,
  updateTracking,
  listAllTracking,
};
