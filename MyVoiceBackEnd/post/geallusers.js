var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;
router.get('/getallusers', function (req, res) {
    console.log("Request Send to get account info");
    var url = 'mongodb://localhost:27017/MyVoice';
    mongoClient.connect(url, function (err, db) {
        if (err) {
            var k = { error: "Error while handlng the request 1" };
            console.log(JSON.stringify(k));
            res.write(JSON.stringify(k));
            res.end();
        } else {
            var users = db.collection('users');
            users.find({}).toArray(function (err, e) {
                if (err) {
                    var k = { error: "Error while handlng the request 3" };
                    console.log(JSON.stringify(k));
                    res.write(JSON.stringify(k));
                    res.end();
                } else {
                    if (e.length > 0) {
                        var k = { result: e };
                        console.log(JSON.stringify(k));
                        res.write(JSON.stringify(k));
                        res.end();
                    } else {
                        var k = { error: e };
                        console.log(JSON.stringify(k));
                        res.write(JSON.stringify(k));
                        res.end();
                    }
                    db.close();
                }
            });
        }
    });
});
module.exports.router = router;