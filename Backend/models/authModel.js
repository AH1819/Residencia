const db = require("../config/db.config");
const nodemailer = require("nodemailer");

exports.findByRFC = (rfc) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM usuarios WHERE rfc = ? AND status = 1";

    db.query(query, [rfc], (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results[0]);
    });
  });
};

exports.findUserByRFC = (rfc) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM usuarios WHERE rfc = ?";

    db.query(query, [rfc], (error, results) => {
      if (error) {
        console.log(error);
        reject(error);
        return;
      }
      console.log(results);
      resolve(results[0]);
    });
  });
};

exports.transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pruebaunachmx@gmail.com",
    pass: "t n m r d e p t a o y e u c b v",
  },
});

exports.updatePassword = (rfc, password) => {
  return new Promise((resolve, reject) => {
    const query = "UPDATE usuarios SET password = ? WHERE rfc = ?";
    console.log(query, password, rfc);
    db.query(query, [password, rfc], (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      console.log(results);
      resolve(results);
    });
  });
};

exports.findPermisosByRFC = (rfc) => {
  return new Promise((resolve, reject) => {
    const query = `
            SELECT u.nombre_Doce AS NombreUsuario, p.descripcion AS Permiso 
            FROM usuarios AS u 
            JOIN usuarios_permisos AS up ON u.rfc = up.idUsuario 
            JOIN permisos AS p ON up.idPermiso = p.idPermisos 
            WHERE u.rfc = ?
        `;

    db.query(query, [rfc], (error, results) => {
      if (error) {
        reject(error);
        return;
      }

      // Aquí asumimos que un usuario puede tener múltiples permisos,
      // por lo que devolvemos todos los resultados (y no solo results[0]).
      resolve(results);
    });
  });
};
