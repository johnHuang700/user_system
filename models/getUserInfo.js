const db = require('../database/mysql.js');

module.exports = function getUserInfo(usr) {
    return new Promise((resolve, reject) => {
        // 找尋
        db.query('SELECT usr,name,sex,birth FROM users where usr = ?',usr, function (err, rows) {
            if (err) {
                console.log(err);
                return;
            }
            resolve(rows);
        });
    });
}