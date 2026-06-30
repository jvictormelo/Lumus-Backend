/**
 * Middleware que verifica se o usuário está autenticado via sessão.
 * Bloqueia o acesso à rota caso não exista uma sessão ativa.
 * @module middlewares/auth
 */
const requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: req.t('errors.not_authenticated') });
  }
  next();
};

module.exports = requireAuth;
