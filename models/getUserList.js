const db = require('../database/mysql.js');

module.exports = function getUserList() {
    return new Promise((resolve, reject) => {
        // 找尋
        db.query('SELECT u.usr,r.role_id FROM users u left join role_connect r on r.user_id=u.user_id',null, function (err, rows) {
            if (err) {
                console.log(err);
                return;
            }
            resolve(rows);
        });
    });
}