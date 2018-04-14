var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;
router.post('/login', function (req, res) {
    console.log("Request Send to insert User contact");
    var url = 'mongodb://localhost:27017/MyVoice';
    var password = req.headers.x_password;
    var username = req.headers.x_username;
    var email = req.headers.x_email;
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
            var k = { error: "Problem to handle the request 1" };
            res.write(JSON.stringify(k));
            res.end();
            db.close();
        } else {
            var users = db.collection('users');
            users.find({
                $and: [
                    { email: email },
                    { usermane: username }
                ]
            }).toArray(function (err2, e2) {
                if (err2) {
                    var k = { error: "Problem in order to add th symptom 2" };
                    res.write(JSON.stringify(k));
                    res.end();
                    db.close();
                } else {
                    if (e2.length > 0) {
                        var k = { result: "true" };
                        res.write(JSON.stringify(k));
                        res.end();
                        db.close();
                    } else {
                        var k = { result: "false" };
                        res.write(JSON.stringify(k));
                        res.end();
                        db.close();
                    }
                }
            });
        }
    });
});
module.exports.router = router;
