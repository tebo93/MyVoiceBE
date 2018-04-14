var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;
var assert = require('assert');
router.put('/accountinfo', function (req, res) {
    console.log("Request Send to modify Account");
    var url = 'mongodb://localhost:27017/360medlink';
    var first_name = req.headers.x_first_name;
    var last_name = req.headers.x_last_name;
    var password = req.headers.x_password;
    var username = req.headers.x_username;
    var subject = req.headers.x_subject;
    var email = req.headers.x_email;
    var institution = req.headers.x_institution;
    mongoClient.connect(url, function (err, db) {
        if (err) {
            var k = { error: "Problem in order to modify" };
            res.write(JSON.stringify(k));
            res.end();
        } else {
            var doc = users.collection('users');
            users.updateOne({
                email: email,
                password: password}, {
                    $set: {
                        first_name: first_name,
                        last_name: last_name,
                        subject: subject,
                        institution: institution
                    }
                }, function (err3, updateE) {
                    if (err3) {
                        var k = { error: "Problem in order to update" };
                        res.write(JSON.stringify(k));
                        res.end();
                    } else {
                        var k = { result: "Updated correctly" };
                        res.write(JSON.stringify(k));
                        res.end();
                        db.close();
                    }
                });
        }
    });
});
module.exports.router = router;