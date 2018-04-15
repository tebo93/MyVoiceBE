var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;
var assert = require('assert');
router.delete('/account', function (req, res) {
    console.log("Request Send to delete User account");
    var password = req.headers.x_password;
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
    var url = 'mongodb://localhost:27017/MyVoice';
    mongoClient.connect(url, function (err, db) {
        if (err) {
            var k = { error: "Problem to handle the request 1" };
            res.write(JSON.stringify(k));
            res.end();
        } else {
            var users = db.collection('users');
            users.find({
                $and: [{ password: password }, { email: email }]
            }).toArray(function (err2, e2) {
                if (err2) {
                    var k = { error: "Problem to handle the request 2" };
                    res.write(JSON.stringify(k));
                    res.end();
                } else {
                    if (e2.length > 0) {
                        var doc = db.collection('users');
                        doc.remove({
                            $and: [{ password: password }, { email: email }]
                        },
                            function (err3, deleteF) {
                                if (err3) {
                                    var k = { error: "Problem to handle the request 3" + err3.message};
                                    res.write(JSON.stringify(k));
                                    res.end();
                                } else {
                                    console.log(JSON.stringify(deleteF));
                                    var k = { result: "Deleted corrected" };
                                    res.write(JSON.stringify(k));
                                    res.end();
                                    db.close();
                                }
                            });
                    } else {
                        var k = { error: "Problem to handle the request 4: " };
                        res.write(JSON.stringify(k));
                        res.end();
                        db.close();
                    }
                }
            });
            //db.close();
        }
    });
});
module.exports.router = router;