const db = require("../config/db.config");

function obtenerActividades(callback) {
  const query = `SELECT 
    actT.idActTutorias, 
    actT.nombreActTutorias, 
    actT.descripcionActTutorias, 
    actT.fechaActTutorias, 
    actT.prog_academico, 
    prog.nombreProg,
    COUNT(DISTINCT evt.idevidenciasT) AS cantidad_evidencias
    FROM actividadesTutorias actT
    LEFT JOIN prog_academicos prog 
    ON prog.idprog_academicos = actT.prog_academico 
    LEFT JOIN evidenciastutorias evt 
    ON evt.idActividad = actT.idActTutorias 
    GROUP BY actT.idActTutorias`;
  db.query(query, (error, rows) => {
    if (error) {
      callback(error, null);
      console.log("error");
    } else {
      callback(null, rows);
    }
  });
}

function buscarProgAcademico(callback) {
  const query = "SELECT * FROM prog_academicos;";
  db.query(query, (error, rows) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, rows);
    }
  });
}

function buscarActividad(id, callback) {
  const query = "SELECT * FROM actividadesTutorias WHERE idActTutorias = ?";
  db.query(query, [id], (error, rows) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, rows);
    }
  });
}

function insertarActividad(data, callback) {
  const query = "INSERT INTO actividadesTutorias SET ?";
  db.query(query, data, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

function editarActividad(id, newData, callback) {
  const query = "UPDATE actividadesTutorias SET ? WHERE idActTutorias = ?";
  db.query(query, [newData, id], (error, results) => {
    if (error) {
      console.error("Error al editar la actividad:", error);
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

function eliminarActividad(id, callback) {
  const query = "DELETE FROM actividadesTutorias WHERE idActTutorias = ?";
  db.query(query, [id], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

function obtenerEvidencias(idActividad, callback) {
  const query =
    "select ev.idevidenciasT,ev.nombreEvi, ev.descripcionEvi,ev.fecha_creacion, ev.urlEvi, ev.idActividad, act.nombreActTutorias from evidenciasTutorias as ev, actividadesTutorias as act WHERE ev.idActividad = ? and ev.idActividad = act.idActTutorias";
  db.query(query, [idActividad], (error, rows) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, rows);
    }
  });
}

function insertarEvidencias(data, callback) {
  const query = "INSERT INTO evidenciasTutorias SET ?";
  db.query(query, data, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}
function actualizarEvidencias(id, data, callback) {
  const query = "UPDATE evidenciasTutorias SET ? WHERE idevidenciasT = ?";
  db.query(query, [data, id], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

function eliminarEvidencia(id, callback) {
  const query = "DELETE FROM evidenciasTutorias WHERE idevidenciasT = ?";
  db.query(query, [id], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}
function obtenerEvidenciaPorId(id, callback) {
  const query = "SELECT * FROM evidenciasTutorias WHERE idevidenciasT = ?";
  db.query(query, [id], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

module.exports = {
  obtenerActividades,
  insertarActividad,
  editarActividad,
  eliminarActividad,
  buscarActividad,
  buscarProgAcademico,
  obtenerEvidencias,
  insertarEvidencias,
  obtenerEvidenciaPorId,
  actualizarEvidencias,
  eliminarEvidencia,
};
