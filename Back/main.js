const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const userRoutes = require("./routes/usersRoutes");
const productRoutes = require("./routes/productsRoutes");
const stockRoutes = require("./routes/stockRoutes");
const trackingRoutes = require("./routes/trackingRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(userRoutes);
app.use(productRoutes);
app.use(stockRoutes);
app.use(trackingRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
