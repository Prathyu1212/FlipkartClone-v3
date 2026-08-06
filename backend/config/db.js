require("dotenv").config();

const sql = require("mssql");

const config = {
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,

    options: {
        encrypt: true,
        trustServerCertificate: true
    },

    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

// Create one connection pool
const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {

        console.log("✅ Connected to SQL Server");

        return pool;

    })
    .catch(error => {

        console.error("❌ Database Connection Failed");

        console.error(error);

    });

module.exports = {
    sql,
    poolPromise
};