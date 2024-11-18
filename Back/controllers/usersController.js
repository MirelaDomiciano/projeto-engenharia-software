const User = require("../models/usersModel");

const signIn = async (req, res) => {
  try {
    const login = await User.getUser(req.query.email, req.query.password);
    if (!login) return res.status(404).json({ error: "User not found" });
    res.status(200).send(login[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signIn,
};
