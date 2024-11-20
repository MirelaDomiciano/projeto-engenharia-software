const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  listProducts,
  buyProduct,
  addProduct,
  validateProduct,
  uploadImage,
  deleteProduct,
} = require("../controllers/productsController");

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.get("/products", listProducts);
router.post("/products/buy", buyProduct);
router.post("/products", addProduct);
router.patch("/products/validate", validateProduct);
router.post("/uploadImage", upload.single("file"), uploadImage);
router.delete("/products", deleteProduct);

module.exports = router;
