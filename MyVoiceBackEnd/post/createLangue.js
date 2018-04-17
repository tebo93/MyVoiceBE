var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;
router.post('/accountlan', function (req, res) {
    console.log("Request Send to insert User contact");
    var url = 'mongodb://localhost:27017/MyVoice';
    var password = req.headers.x_password;
    var email = req.headers.x_email;
    var langue = req.headers.x_langue;
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
    } else if (!langue || langue.length === 0) {
        var k = { error: "langue empty" };
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
                email: email,
                password: password
            }).toArray(function (err2, e2) {
                var doc = db.collection('users');
                doc.updateOne({ email: e2[0].email },
                    {
                        $push:
                            {
                                langues:
                                    {
                                        langue: langue,
                                        mots: [],
                                        phoneme: []
                                    }
                            }
                    },
                    function (err3, updateE) {
                        if (err3) {
                            var k = { error: "Problem in order to add th symptom" };
                            res.write(JSON.stringify(k));
                            res.end();
                        } else {
                            var k = { result: "Added correctly" };
                            res.write(JSON.stringify(k));
                            res.end();
                            db.close();
                        }
                    });
            });
        }
    });
});
module.exports.router = router;
