const jwt = require("jsonwebtoken");

function jwtAuth(req, res, next) {
  // Verificar el token JWT
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
}

module.exports = jwtAuth;
