<<<<<<< HEAD
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('roles2', {
        idRol: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombreRol: DataTypes.TEXT,
        descripcion: DataTypes.TEXT
    });
=======
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('roles2', {
        idRol: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombreRol: DataTypes.TEXT,
        descripcion: DataTypes.TEXT
    });
>>>>>>> 4774afb202d49fe193f0a5ad021271411a462076
};