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

app.post("/createTask", function(req, res) {

    console.log(req.body);
    if(req.body.taskCreatorId) {
        var title = req.body.title;
        var description = req.body.description;
        var category = req.body.category;
        var openingPrice = req.body.openingPrice;
        var currentBid = req.body.currentBid;
        var taskCreatorId = req.body.taskCreatorId;
        var imageUpload = req.body.imageUpload;
        var createdDate = Date.now();
        var Id = createdDate + taskCreatorId;
        var lat = req.body.lat;
        var long = req.body.long;

        //Adding to database
        var db = firebase.database();
        var ref = db.ref("/Tasks/");
        var tasksRef = ref.child(Id);
        tasksRef.set({
            title : title,
            decription : description,
            category : category,
            openingPrice : openingPrice,
            currentBid : currentBid,
            taskCreatorId : taskCreatorId,
            createdDate : createdDate,
            Id : Id,
            imageUpload : imageUpload,
            lat : lat,
            long: long
        });
        res.status(200).json({message : "Task creation successful"});
    } else {
        res.status(501).json({message : "No taskCreatorId"});
    }
});

app.post("/updateTask", function (req, res) {
    console.log(req.body);
    var Id = req.body.Id;
    var db = firebase.database();
    var ref = db.ref("/Tasks/");
    var taskRef = ref.child(Id);
    taskRef.update({
        currentBid : req.body.currentBid
    });
    res.status(200).json({message : "Task update successful"});
});

app.post("/getAllTasks", function(req, res) {

    if(req.body.userId) {
        var currentTime = Date.now();
        var hour = 60 * 60 * 1000;
        var hourAgo = currentTime - hour;
        console.log('Current Time: ' + currentTime);
        console.log('Hour Ago: ' + hourAgo);
        var db = firebase.database();
        var ref = db.ref("/Tasks/");
        ref
        .orderByChild('createdDate')
        .startAt(hourAgo)
        .endAt(currentTime)
        .once("value", function(snapshot) {
            res.status(200).json(snapshot.val());
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

    } else {
        res.status(501).json({message : "No userId"});
    }
});

app.post("/getAccount", function(req, res) {

    if(req.body.userId) {
        //var db = firebase.database();
        //var ref = db.ref("/Accounts/");

        var ref = firebase.database().ref("Accounts/" + req.body.userId);
        ref.once("value", function(snapshot) {
            res.status(200).json(snapshot.val());
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

        // ref.child('users').orderByChild('userId').equalTo(req.body.userId);
    } else {
        res.status(501).json({message : "No userId"});
    }
});

app.post("/getTask", function(req, res) {

    if(req.body.taskId) {

        var ref = firebase.database().ref("Tasks/" + req.body.taskId);
        ref.once("value", function(snapshot) {
            res.status(200).json(snapshot.val());
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    } else {
        res.status(501).json({message : "No taskId"});
    }
});
