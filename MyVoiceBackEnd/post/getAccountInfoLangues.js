var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;
router.post('/accountinfolangues', function (req, res) {
    console.log("Request Send to get account info");
    var url = 'mongodb://localhost:27017/MyVoice';
    var email = req.headers.x_email;
    var password = req.headers.x_password;
    if (!password || password.length === 0) {
        var k = { error: "password empty" };
        res.write(JSON.stringify(k));
        res.end();
        return;
    } else if (!email || email.length === 0) {
        var k = { error: "email empty" };
        res.write(JSON.stringify(k));
        res.end();
        return;
    }

    mongoClient.connect(url, function (err, db) {
        if (err) {
            var k = { error: "Error while handlng the request 1" };
            console.log(JSON.stringify(k));
            res.write(JSON.stringify(k));
            res.end();
        } else {
            var users = db.collection('users');
            users.find({ email: email, password: password }).toArray(function (err, e) {
                if (err) {
                    var k = { error: "Error while handlng the request 3" };
                    console.log(JSON.stringify(k));
                    res.write(JSON.stringify(k));
                    res.end();
                } else {
                    if (e.length > 0) {
                        var k = { result: e[0].langues };
                        console.log(JSON.stringify(k));
                        res.write(JSON.stringify(k));
                        res.end();
                    } else {
                        var k = { error: "Wrong email or password"};
                        console.log(JSON.stringify(k));
                        res.write(JSON.stringify(k));
                        res.end();
                    }
                    db.close();
                }
            });
            db.close();
        }
    });
});
module.exports.router = router;