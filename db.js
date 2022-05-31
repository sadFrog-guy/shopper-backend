const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    process.env.DB_NAME || 'shopperDB',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || 'nuria2005',
    {
        dialect: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || '5000'
    }
)