const db = require('../utils/db');

module.exports = class NetworkStatusModel {
    static async saveStatus(status) {
        let conn;
        let rows;
        try {
            conn = await db.getConnection();
            rows = await conn.query(
                `INSERT INTO status (date, response, ip) 
                 VALUES(?, ?, ?);`,
                [new Date(), status.response, status.ip]
            );
        } catch (error) {
            console.error(error.message);
            throw new Error("DB_ERROR");
        } finally {
            if (conn) await conn.release();
        }
        return rows;
    }
}