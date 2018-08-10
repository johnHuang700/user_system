const db = require('../database/mysql.js');

module.exports = function toRegister(userData) {
    console.log('toRegister');
    let result = {};
    return new Promise((resolve, reject) => {
        // 將資料寫入資料庫
        db.query('SELECT usr FROM users WHERE usr = ?', userData.info.usr, function (err, rows) {
            // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
            if (err) {
                console.log(err);
                result.status = "註冊失敗。"
                result.err = "伺服器錯誤，請稍後在試！"
                reject(result);
                return;
            }
            if (rows.length >= 1) {
                result.status = "註冊失敗。";
                result.err = "帳號重複";
                reject(result);
                return;
            } else {
                // 將資料寫入資料庫
                db.query('INSERT INTO users SET ?', userData.info, function (err, rows) {
                    // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
                    if (err) {
                        console.log(err);
                        result.status = "註冊失敗。";
                        result.err = "伺服器錯誤，請稍後在試！";
                        reject(result);
                        return;
                    }
                    result.status = '';
                    if (userData.role != 'no') {
                        db.query('select user_id from users where usr=?', userData.info.usr, function (err, rows) {
                            let role_data = {};
                            role_data.user_id = rows[0].user_id;
                            role_data.role_id = 1;
                            role_data.usr = userData.info.usr;
                            db.query('INSERT INTO role_connect SET ?', role_data, function (err, rows) {
                                // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
                                if (err) {
                                    console.log(err);
                                    this.result.status = "註冊成功權限設定失敗。";
                                    result.registerMember = userData;
                                    resolve(result);
                                }
                            });
                        });
                    }
                    // 若寫入資料庫成功，則回傳給clinet端下：
                    result.status = "註冊成功。";
                    result.registerMember = userData;
                    resolve(result);
                });
            }
        });
    });
}
