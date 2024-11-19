const express = require("express");
const router = express.Router();
const { updateStock, listStock } = require("../controllers/stockController");

router.put("/stock", updateStock);
router.get("/stock/list", listStock);

module.exports = router;
