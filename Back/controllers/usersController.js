const User = require("../models/usersModel");
const bcrypt = require("bcrypt");

const signIn = async (req, res) => {
  try {
    const { email, password } = req.query;

    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    const users = await User.getUserByEmail(email);

    if (users.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const user = users[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    const { password: _, ...userData } = user;
    res.status(200).json(userData);
  } catch (error) {
    console.error("Erro em signIn:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const signUp = async (req, res) => {
  try {
    const { name, email, password, address, type } = req.body;

    const existingUser = await User.getUserByEmail(email);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: "Email já está em uso" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.createUser({
      name,
      email,
      password: hashedPassword,
      address,
      type,
    });

    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    console.error("Erro em signUp:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signIn,
  signUp,
};
