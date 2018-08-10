var express = require('express');
var moment = require('moment');
var router = express.Router();
var toRegister = require('../models/register_model');
var toEdit = require('../models/edit_model');
var toDelete = require('../models/delete_model');
var encryption = require('../models/encryption');
var getUserInfo = require('../models/getUserInfo');

/* GET users listing. */
router.get('/', function (req, res, next) {
    if (req.session.role != 'admin' || !req.session.usr || !req.query.usr) {
        res.render('permission_denied');
    }

    var usr = req.query.usr;
    getUserInfo(usr).then(rows => {
        console.log(rows);
        res.render('userInfo', {
            title: usr + '的資料',
            user: rows,
            moment: moment
        });
    });

});

router.get('/register', function (req, res, next) {
    if (req.session.role != 'admin' || !req.session.usr) {
        res.render('permission_denied');
    }
    res.render('register', {
        title: '註冊管理員',
        role: 'admin'
    });
});

router.get('/edit', function (req, res, next) {
    if (req.session.role != 'admin' || !req.session.usr || !req.query.usr) {
        res.render('permission_denied');
    }
    var usr = req.query.usr;
    getUserInfo(usr).then(rows => {
        console.log(rows);
        res.render('edit', {
            title: usr,
            user: rows,
            moment: moment
        });
    });
});

router.get('/delete', function (req, res, next) {
    if (req.session.role != 'admin' || !req.session.usr || !req.query.usr) {
        res.render('permission_denied');
    }
    var usr = req.query.usr;
    res.render('delete', {
        title: usr
    });

});

router.get('/create_user', function (req, res, next) {
    if (req.session.role != 'admin' || !req.session.usr) {
        res.render('permission_denied');
    }
    res.render('register', {
        title: '新增使用者',
        role: 'no'
    });
});



router.post('/register', function (req, res) {
    if (req.session.role != 'admin' || !req.session.usr) {
        res.render('permission_denied');
    }
    var password = encryption(req.body.pwd);
    var userData = {
        info: {
            usr: req.body.usr,
            password: password,
            name: req.body.name,
            sex: req.body.sex,
            birth: req.body.birthday
        },
        role: req.body.role
    }

    toRegister(userData).then(result => {
        res.render('register_result', {
            title: '註冊結果',
            status: result.status,
            result: JSON.stringify(result)
        });
    }, (err) => {
        res.render('register_result', {
            title: '註冊結果',
            status: result.err,
            result: JSON.stringify(err)
        });
    });
});

router.post('/edit', function (req, res) {
    if (req.session.role != 'admin' || !req.session.usr) {
        res.render('permission_denied');
    }
    var userData = {
        name: req.body.name,
        birth: req.body.birthday

    }

    toEdit(userData).then(result => {
        res.render('register_result', {
            title: '更新結果',
            status: result.status,
            result: JSON.stringify(result)
        });
    }, (err) => {
        res.render('register_result', {
            title: '更新結果',
            status: result.err,
            result: JSON.stringify(err)
        });
    });
});

router.post('/delete', function (req, res) {
    if (req.session.role != 'admin' || !req.session.usr) {
        res.render('permission_denied');
    }
    var usr = req.body.usr
    toDelete(usr).then(result => {
        res.render('register_result', {
            title: '刪除結果',
            status: result.status,
            result:''
        });
    }, (err) => {
        res.render('register_result', {
            title: '刪除結果',
            status: result.err,
            result:''
        });
    });
});

module.exports = router;
