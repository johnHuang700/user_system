const db = require('../database/mysql.js');

module.exports = function toEdit(usr) {
    console.log('toRegister');
    let result = {};
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM users WHERE usr = ?', usr, function (err, rows) {
            if (err) {
                console.log(err);
                result.status = "刪除失敗";
                result.err = "伺服器錯誤，請稍後在試！";
                reject(result);
                return;
            }
            result.status = "刪除成功";
            resolve(result);
        });
    });
}