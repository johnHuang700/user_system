var express = require('express');
var router = express.Router();
var toLogin = require('../models/login_model');
var getUserList = require('../models/getUserList');
var encryption = require('../models/encryption');

/* GET home page. */

router.get('/', function (req, res, next) {
    if (!req.session.usr) {
        res.redirect('/login');
    } else if (req.session.role = 'admin') {
        getUserList().then(rows => {
            res.render('userManager', {
                title: 'userManager',
                userList: rows
            });
        });
    } else {
        res.render('index', {
            title: 'index'
        });
    }
});

router.get('/login', function (req, res, next) {
    res.render('login', {
        title: 'login',
        message: ''
    });

});

router.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
});

router.post('/login', function (req, res, next) {
    var password = encryption(req.body.pwd);
    var userData = {
        usr: req.body.usr,
        password: password,
    }
    toLogin(userData).then(rows => {
        if (checkNull(rows) === true) {
            res.render('login', {
                title: 'login',
                message: '登入失敗。請輸入正確的帳號或密碼。'
            });
        } else if (checkNull(rows) === false) {
            req.session.usr = rows[0].usr;
            req.session.role = rows[0].role_name;
            res.redirect('/');
        }
    })
});

function checkNull(data) {
    for (var key in data) {
        // 不為空
        return false;
    }
    // 為空值
    return true;
}
module.exports = router;
