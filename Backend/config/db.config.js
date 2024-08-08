const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10, // Número máximo de conexiones en el pool
  host: "localhost",
  user: "root",
  password: "",
  database: "sistema_gestion2",
});

pool.on("connection", function (connection) {
  console.log("Conexión a la base de datos establecida");
});

pool.on("error", function (error) {
  console.error("Error en la conexión a la base de datos:", error);
  if (
    error.code === "PROTOCOL_CONNECTION_LOST" ||
    error.code === "ECONNRESET"
  ) {
    console.error("Conexión a la base de datos perdida, reconectando...");
  } else {
    throw error;
  }
});

module.exports = pool;
