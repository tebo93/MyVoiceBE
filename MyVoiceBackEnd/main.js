var express = require('express');
var app = express();
var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log(" listening at http://%s:%s", host, port);
});
app.use('/', require('../MyVoiceBackEnd/post/createAccount').router);
app.use('/', require('../MyVoiceBackEnd/post/logInAccount').router);
app.use('/', require('../MyVoiceBackEnd/post/getAccountInformation').router);
app.use('/', require('../MyVoiceBackEnd/put/modifyAccount').router);
app.use('/', require('../MyVoiceBackEnd/post/geallusers').router);
app.use('/', require('../MyVoiceBackEnd/delete/deleteAccount').router);
app.use('/', require('../MyVoiceBackEnd/put/addMotToLangue').router);
app.use('/', require('../MyVoiceBackEnd/post/createLangue').router);
app.use('/', require('../MyVoiceBackEnd/post/getAccountInfoLangues').router);
