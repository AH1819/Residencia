const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Usuario = require("../models/authModel");

exports.login = async (req, res) => {
  const { rfc, password } = req.body;

  try {
    const usuario = await Usuario.findByRFC(rfc);

    if (!usuario) {
      return res.status(400).send("Usuario no encontrado");
    }

    const validPassword = await bcrypt.compare(password, usuario.password);

    if (!validPassword) {
      return res.status(400).send("Contraseña incorrecta");
    }

    const token = jwt.sign(
      { id: usuario.id, rfc: usuario.rfc },
      "TU_SECRETO_AQUI",
      { expiresIn: "1h" }
    );
    res.send({ token, usuario });
  } catch (error) {
    // Maneja errores
    res.status(500).send("Error del servidor");
  }
};

exports.getUser = async (req, res) => {
  const { rfc } = req.params;

  try {
    const user = await Usuario.findUserByRFC(rfc);
    if (!user) {
      return res.status(400).send("Usuario no encontrado");
    }
    res.send({ user });
  } catch (error) {
    // Maneja errores
    res.status(500).send("Error del servidor");
  }
};

function generateRandomPassword(length) {
  return crypto.randomBytes(length).toString("hex").slice(0, length);
}

const path = require("path");

exports.sendEmail = (req, res) => {
  const password = generateRandomPassword(12);
  const logoPath = path.join(__dirname, "../unach.png");

  const mailOptions = {
    from: "pruebaunachmx@gmail.com",
    to: req.body.to,
    subject: req.body.subject,
    html: `<p>Estimado usuario,</p>
           <p>Su contraseña temporal es: <strong>${password}</strong>. Puede cambiarla en cualquier momento.</p>
           <p>Atentamente,<br>Equipo de Soporte</p>
           <div style="background-color: rgb(0,46,99); display: inline-block; padding: 10px;">
             <img src="cid:unique@cid" style="display: block; width: 500px; height: auto;" />
           </div>`, // Referencia al CID de la imagen
    attachments: [
      {
        filename: "unach.png", // Nombre de la imagen adjunta
        path: logoPath, // Ruta al archivo de imagen
        cid: "unique@cid", // CID (Content-ID) para referenciar la imagen en el HTML
      },
    ],
  };

  Usuario.transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error al enviar el correo electrónico:", error);
      res.status(500).json({
        error:
          "No se pudo enviar el correo electrónico. Por favor, inténtelo nuevamente más tarde.",
      });
    } else {
      console.log("Correo electrónico enviado con éxito:", info.response);
      console.log(updatePassword(req.body.rfc, password));
      res.json({ message: "Correo electrónico enviado con éxito" });
    }
  });
};

function updatePassword(rfc, password) {
  const hashedPassword = bcrypt.hashSync(password, 10);
  return Usuario.updatePassword(rfc, hashedPassword);
}

exports.getPermisos = async (req, res) => {
  const { rfc } = req.params;

  try {
    const permisos = await Usuario.findPermisosByRFC(rfc);
    if (!permisos) {
      return res.status(400).send("Permisos no encontrados");
    }
    res.send({ permisos });
  } catch (error) {
    // Maneja errores
    res.status(500).send("Error del servidor");
  }
};
