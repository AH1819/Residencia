const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'unach.cte6seagit09.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: '18192001',
    database: 'sistema_gestion2'
});

conexion.connect(function (error) {
    if (error) {
        throw error;
    } else {
        console.log("La conexion es exitosa");
    }
});

module.exports = conexion;
