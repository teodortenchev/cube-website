const dbUrl = require('./dbConnectionSettings');

module.exports = {
    development: {
        port: process.env.PORT || 3000,
        databaseUrl: dbUrl.dbConnectionString
    },
    production: {}
};