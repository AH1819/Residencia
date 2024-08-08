const db = require("../config/db.config");

function showAll(callback) {
  const query = `
  SELECT 
    usr.rfc,
    usr.nombre_Doce,
    usr.apellido_paterno,
    usr.apellido_materno,
    usr.n_plaza,
    usr.fecha_creacion,
    COUNT(dd.idUsuario) AS cantidad_evidencias
FROM 
    usuarios usr
LEFT JOIN 
    documentos_docentes dd
ON 
    usr.rfc = dd.idUsuario 
WHERE 
    usr.n_plaza IS NOT NULL 
GROUP BY 
    usr.rfc,
    usr.nombre_Doce,
    usr.apellido_paterno,
    usr.apellido_materno,
    usr.n_plaza,
    usr.fecha_creacion;
`;
  db.query(query, (error, rows) => {
    if (error) {
      callback(error, null);
      console.log("error");
    } else {
      callback(null, rows);
    }
  });
}

function insertarDocente(data, callback) {
  const query = "INSERT INTO secretariaAc SET ?";
  db.query(query, data, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

function editarDocente(id, newData, callback) {
  const query = "UPDATE secretariaAc SET ? WHERE idSecretaria = ?";
  db.query(query, [newData, id], (error, results) => {
    if (error) {
      console.error("Error al editar el registro:", error);
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

function eliminarDocente(id, callback) {
  const query = "DELETE FROM secretariaAc WHERE idSecretaria = ?";
  db.query(query, [id], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

function obtenerDocumentos(idSecretaria, callback) {
  const query =
    "SELECT dd.idDocumento, dd.idUsuario,dd.nombreDoc, td.descripcion, dd.urlDocumento, dd.fecha FROM documentos_docentes AS dd JOIN tipo_documento AS td ON dd.idTipoDocumento = td.idTipoDocumento WHERE dd.idUsuario = ?;";
  db.query(query, [idSecretaria], (error, rows) => {
    if (error) {
      console.log("error:", error);
      callback(error, null);
    } else {
      callback(null, rows);
    }
  });
}

function getTipo(callback) {
  const query = "SELECT * FROM tipo_documento";
  db.query(query, (error, rows) => {
    if (error) {
      callback(error, null);
      console.log("error");
    } else {
      callback(null, rows);
    }
  });
}

function insertarDocumentos(data, callback) {
  const query = "INSERT INTO documentos_docentes SET ?";
  db.query(query, data, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

function obtenerDocumentosPorId(id, callback) {
  const query = "SELECT * FROM documentos_docentes WHERE idDocumento = ?";
  db.query(query, [id], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

function actualizarDocumentos(id, data, callback) {
  const query = "UPDATE documentos_docentes SET ? WHERE idDocumento = ?";
  db.query(query, [data, id], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}
function eliminarDocumentos(id, callback) {
  const query = "DELETE FROM documentos_docentes WHERE idDocumento = ?";
  db.query(query, [id], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

module.exports = {
  showAll,
  insertarDocente,
  editarDocente,
  eliminarDocente,

  getTipo,
  obtenerDocumentos,
  insertarDocumentos,
  obtenerDocumentosPorId,
  actualizarDocumentos,
  eliminarDocumentos,
};
