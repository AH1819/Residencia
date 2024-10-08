const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");
const authenticateJWT = require("../middlewares/authenticateJWT");

// Ruta para iniciar sesión
router.post("/login", AuthController.login);

// Ruta para obtener información de un usuario por RFC
router.get("/usuario/:rfc", AuthController.getUser);

// Ruta para enviar un correo electrónico
router.post("/send-email", AuthController.sendEmail);

// Ruta para obtener permisos de un usuario por RFC
router.get("/permisos/:rfc", authenticateJWT, AuthController.getPermisos);

router.get("/rutaProtegida", authenticateJWT, (req, res) => {
  res.send("Esta es una ruta protegida");
});

module.exports = router;
