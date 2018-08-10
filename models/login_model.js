const db = require('../database/mysql.js');

module.exports = function toLogin(userData) {
    let result = {};
    return new Promise((resolve, reject) => {
        // 找尋
        db.query('SELECT u.usr,rc.role_id,r.role_name FROM users u left join role_connect rc on rc.user_id = u.user_id join roles r on r.role_id = rc.role_id WHERE u.usr = ? AND u.password = ?', [userData.usr, userData.password], function (err, rows) {
            if (err) {
                result.status = "登入失敗。"
                result.err = "伺服器錯誤，請稍後在試！"
                reject(result);
                return;
            }
            resolve(rows);
        });
    });
}