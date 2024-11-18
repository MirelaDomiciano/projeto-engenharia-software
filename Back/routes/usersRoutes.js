const express = require("express");
const router = express.Router();

const { signIn } = require("../controllers/usersController");

//router.post("/signUp", signUp);
router.get("/signIn", signIn);

module.exports = router;
