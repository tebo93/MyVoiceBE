var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;
router.post('/account', function (req, res) {
    console.log("Request Send to insert User contact");
    var url = 'mongodb://localhost:27017/MyVoice';
    var first_name = req.headers.x_first_name;
    var last_name = req.headers.x_last_name;
    var password = req.headers.x_password;
    var username = req.headers.x_username;
    var subject = req.headers.x_subject;
    var email = req.headers.x_email;
    var institution = req.headers.x_institution;
    if (!first_name || first_name.lenght === 0) {
        var k = { error: "first name empty" };
        res.write(JSON.stringify(k));
        res.end();
        return;
    } else if (!last_name || last_name.length === 0) {
        var k = { error: "last name empty" };
        res.write(JSON.stringify(k));
        res.end();
        return;
    } else if (!password || password.length === 0) {
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
        } else {
            var users = db.collection('users');
            users.find({
                $or: [
                    { email: email },
                    { usermane: username }
                ]
            }).toArray(function (err2, e2) {
                if (err2) {
                    var k = { error: "Problem in order to add th symptom 2" };
                    res.write(JSON.stringify(k));
                    res.end();
                } else {
                    if (e2.length > 0) {
                        var k = { error: "the account (email or username) already exist" };
                        res.write(JSON.stringify(k));
                        res.end();
                        db.close();
                    } else {
                        var doc = db.collection('users');
                        var userdata = {
                            first_name: first_name,
                            last_name: last_name,
                            password: password,
                            username: username,
                            subject: subject,
                            institution: institution,
                            email: email,
                            langues: [],
                            mots: []
                        };
                        doc.insertOne(userdata, function (err3, resp) {
                            if (err3) {
                                var k = { error: "error while creating" };
                                res.write(JSON.stringify(k));
                            } else {
                                var k = { result: "created correctly" };
                                res.write(JSON.stringify(k));
                            }
                            res.end();
                            db.close();
                        });
                    }
                }
            });
        }
    });
});
module.exports.router = router;
