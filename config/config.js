module.exports = {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 4000,
    logLevel : process.env.LOG_LEVEL || 'info',
    dbConfig : {
        user: 'amit',
        host: 'localhost',
        database: 'contests',
        password: 'amit',
        port: 5432,
    }
};