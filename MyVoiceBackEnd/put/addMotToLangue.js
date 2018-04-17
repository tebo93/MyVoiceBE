var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;
var assert = require('assert');
router.put('/addmottolangue', function (req, res) {
    console.log("Request Send to modify User symptoms");
    var url = 'mongodb://localhost:27017/360medlink';
    var password = req.headers.x_password;
    var email = req.headers.x_email;
    var langue = req.headers.x_langue;
    var mot = req.headers.x_mot;
    mongoClient.connect(url, function (err, db) {
        if (err) {
            var k = { error: "Problem in order to modify" };
            res.write(JSON.stringify(k));
            res.end();
        } else {
            var sessions = db.collection('sessions');
            sessions.find({
                _id: mongo.ObjectID(session),
                open: true
            }).toArray(function (err2, e2) {
                if (err2) {
                    var k = { error: "Problem in order to modify" };
                    res.wirte(JSON.stringify(k));
                    res.end();
                } else {
                    if (e2.length === 1) {
                        var doc = db.collection('users');
                        doc.updateOne({
                            email: email,
                            password: password
                        },
                            {
                                $push:
                                    {
                                        "langues.mot":
                                            {
                                                mot: mot
                                            }
                                    }
                            },
                            function (err3, updateE) {
                                if (err3) {
                                    var k = { error: "Problem in order to add th symptom" };
                                    res.write(JSON.stringify(k));
                                    res.end();
                                    db.close();
                                } else {
                                    res.write("Added correctly");
                                    res.end();
                                    db.close();
                                }
                            });
                    } else {
                        var k = { error: "Error While updating" };
                        res.write(JSON.stringify(k));
                        res.end();
                        db.close();
                    }
                }
                //db.close();
            });
            //db.close();
        }
    });
});
module.exports.router = router;
//};