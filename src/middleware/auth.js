import pkg from "jsonwebtoken";
const { verify } = pkg;

function authMiddleware(requiredRoles) {
  return (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access denied. You must log in." });
    }

    verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token." });
      }

      const userRole = decoded.role;

      if (!requiredRoles.includes(userRole)) {
        return res.status(403).json({ message: "You do not have permission to access this route." });
      }

      req.user = decoded;
      next();
    });
  };
}

export default authMiddleware;
