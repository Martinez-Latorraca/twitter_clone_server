function makeUserAvailable(req, res, next) {
  // Obtén el token del encabezado de autorización
  const authorizationHeader = req.headers["authorization"];
  const token = authorizationHeader && authorizationHeader.split(" ")[1];

  // Verifica si se proporcionó un token
  if (token) {
    try {
      // Verifica y decodifica el token
      const decoded = jwt.verify(token, secretKey);

      // Asigna el usuario a la solicitud
      req.user = decoded; 

      // Continúa con la siguiente función de middleware
      return next();
    } catch (error) {
      // Error al verificar el token
      return res.status(401).json({ message: "Token inválido" });
    }
  } else {
    // No se proporcionó un token
    return res.status(401).json({ message: "Token no proporcionado" });
  }
}

module.exports = makeUserAvailable;
