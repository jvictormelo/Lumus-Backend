const bcrypt = require('bcryptjs');
const { User } = require('../models');

/**
 * Controller responsável por cadastro, login e logout de usuários.
 * @module controllers/userController
 */

/**
 * Cadastra um novo usuário, criptografando a senha antes de salvar.
 */
const register = async (req, res) => {
  try {
    const { name, email, password, locale } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      locale,
    });

    req.session.userId = user.id;

    res.status(201).json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Autentica um usuário existente.
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }

    req.session.userId = user.id;

    res.json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Encerra a sessão do usuário.
 */
const logout = (req, res) => {
  req.session.destroy();
  res.status(204).send();
};

module.exports = { register, login, logout };