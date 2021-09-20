const express               = require("express");
const app                   = express();
let   server                = require("http").Server(app);
const fileUpload            = require('express-fileupload');
const users_auth            = require("./Users_Authentication/ua_api_users");
const users_post            = require("./Users_Post/up_api");
const users_images          = require("./File_System/fs_api")

const port = process.env.PORT || 4000;

app.use(express.json({limit : '150mb'}));
app.use(express.urlencoded({limit: '150mb', extended: true, parameterLimit: 1000000}));
app.use(express.static(__dirname + '/File_System/images'));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(fileUpload());
app.use('/4climat'              , users_auth);
app.use('/4climat/posts'        , users_post);
app.use('/4climat/images'       , users_images);




module.exports    = app;

server.listen(port);
console.log("Server is up and happy on port:" + port);