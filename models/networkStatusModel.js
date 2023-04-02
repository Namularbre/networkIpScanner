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

    static async fetchAllFromLastWeek(page = 0) {
        let conn;
        let result = [];

        try {
            conn = await db.getConnection();
            result = await conn.query(
                `SELECT ip, response, date 
                 FROM status
                 WHERE week(date)>=week(now())-1 
                 LIMIT 30
                 OFFSET ?`,
                [page]
            );
        } catch (error) {
            console.error(error.message);
            throw new Error("DB_ERROR");
        } finally {
            if (conn) await conn.release();
        }

        return result;
    }
}
