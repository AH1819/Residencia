<<<<<<< HEAD
const Sequelize = require('sequelize');
const RolModel = require('./tablas/roles2.js');
const faker = require('faker');

const sequelize = new Sequelize('sistema_gestion2', 'admin', '18192001', {
    host: 'unach.cte6seagit09.us-east-2.rds.amazonaws.com',
    dialect: 'mysql'
});

const Rol = RolModel(sequelize, Sequelize);

console.log(Rol);

function generateFakeRole() {
    return {
        nombreRol: faker.name.jobTitle(),
        descripcion: faker.lorem.sentence()
    };
}

async function seedRoles() {
    console.log('Tablas Creadas');

    const numberOfRoles = 10;

    for (let i = 0; i < numberOfRoles; i++) {
        const fakeRole = generateFakeRole();
        await Rol.create(fakeRole);
    }

    console.log(`${numberOfRoles} roles ficticios creados.`);
}

sequelize.sync({ force: false })
    .then(() => seedRoles())
=======
const Sequelize = require('sequelize');
const RolModel = require('./tablas/roles2.js');
const faker = require('faker');

const sequelize = new Sequelize('sistema_gestion2', 'admin', '18192001', {
    host: 'unach.cte6seagit09.us-east-2.rds.amazonaws.com',
    dialect: 'mysql'
});

const Rol = RolModel(sequelize, Sequelize);

console.log(Rol);

function generateFakeRole() {
    return {
        nombreRol: faker.name.jobTitle(),
        descripcion: faker.lorem.sentence()
    };
}

async function seedRoles() {
    console.log('Tablas Creadas');

    const numberOfRoles = 10;

    for (let i = 0; i < numberOfRoles; i++) {
        const fakeRole = generateFakeRole();
        await Rol.create(fakeRole);
    }

    console.log(`${numberOfRoles} roles ficticios creados.`);
}

sequelize.sync({ force: false })
    .then(() => seedRoles())
>>>>>>> 4774afb202d49fe193f0a5ad021271411a462076
    .finally(() => sequelize.close());