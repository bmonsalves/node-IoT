const Sequelize = require('sequelize');
const DbSetup = require('../services/db');

module.exports = AgentModel = (config) => {
    const sequelize = DbSetup(config);

    return sequelize.define('agent', {
        uuid: {
            type: Sequelize.STRING,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        hostname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        pid: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        connected: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })
};