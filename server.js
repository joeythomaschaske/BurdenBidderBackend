var express = require("express");
var firebase = require("firebase");
var path = require("path");
var bodyParser = require("body-parser");


firebase.initializeApp({
    serviceAccount: "serviceAccountCredentials.json",
    databaseURL: "https://burdenbidderbackend.firebaseio.com/"
});

var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

/*
 * LOGIN SHIT
 */

//Create new user
app.post("/create", function(req, res) {

    console.log(req.body);
    //Adding to database
    var db = firebase.database();
    var ref = db.ref("/Accounts/");
    var usersRef = ref.child(req.body.userId);
    usersRef.set({
        email: req.body.email,
        userId: req.body.userId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        phoneNo: req.body.phoneNo,
        street: req.body.street,
        city: req.body.city,
        stateCode: req.body.stateCode,
        zip: req.body.zip
    });

    res.status(200).json({message : "Account creation successful"});


});
