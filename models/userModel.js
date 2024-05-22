// userModel.js
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'busfousvdhmthibyluss-mysql.services.clever-cloud.com',
    user: 'ujvr7sawc9cbe6ro',
    password: 'GB0zH5EtlTrSKg4ur8re',
    database: 'busfousvdhmthibyluss'
}); // Assuming you have a database connection

const getUserByuser_name = (user_name, callback) => {
    const query = 'SELECT * FROM users WHERE user_name = ?';
    pool.query(query, [user_name], (error, results) => {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, results[0]); // Assuming user_name is unique, so we return the first result
    });
};

module.exports = { getUserByuser_name };
