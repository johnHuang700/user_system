const db = require('../database/mysql.js');

module.exports = function toEdit(userData) {
    console.log(userData);
    let result = {};
    return new Promise((resolve, reject) => {
        db.query('UPDATE users SET name=?,birth=? where usr = ?', [userData.name,userData.birth,userData.usr], function (err, rows) {
            if (err) {
                console.log(err);
                result.status = "更新失敗";
                result.err = "伺服器錯誤，請稍後在試！";
                reject(result);
                return;
            }
console.log(rows);
            result.status = "更新成功";
            result.registerMember = userData;
            resolve(result);
        });
    });
}
