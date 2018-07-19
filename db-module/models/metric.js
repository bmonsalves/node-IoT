const Sequelize = require('sequelize');
const DbSetup = require('../services/db');
module.exports = MetricModel =  (config) => {
    const sequelize = DbSetup(config);

    return sequelize.define('metric', {
        type: {
            type: Sequelize.STRING,
            allowNull: false
        },
        value: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    })
}