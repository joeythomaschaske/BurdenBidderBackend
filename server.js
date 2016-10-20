var express = require("express");
var firebase = require("firebase");
var path = require("path");
var bodyParser = require("body-parser");


firebase.initializeApp({
    serviceAccount: "serviceAccountCredentials.json",
    databaseURL: "https://burdenbidderbackend.firebaseio.com/"
});

var app = express();
app.use(express.static(__dirname + "/public"));
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
app.get("/SignIn/create", function(req, res) {

    var email = "testDummy@something.com";
    //ID and Password work *************************************************
    var password = "password1";
    var uid = "12345";
    var token = firebase.auth().createCustomToken(uid);
    //**********************************************************************
    var firstName = "Test";
    var lastName = "Dummy";
    var dateOfBirth = "1/1/1111";
    var taskBidder = true;
    var phoneNo = "(111)-123-4567";
    var street = "123 Main st.";
    var city = "NYC";
    var state = "NY";
    var zipCode = "54321";

    //Adding to database
    var db = firebase.database();
    var ref = db.ref("/Accounts/");
    var usersRef = ref.child(firstName+lastName);
    usersRef.set({
        Account: {
            Email: email,
            Id: token,
            FirstName: firstName,
            LastName: lastName,
            DateOfBirth: dateOfBirth,
            TaskBidder: taskBidder,
            PhoneNo: phoneNo,
            Address: {
                Street: street,
                City: city,
                State: state,
                ZipCode: zipCode
            }
        }
    });

    res.status(200).json({message : "Account creation successful"});


});

//Login with existing
app.get("/SignIn", function(req, res) {

    var email = "random@att.net";
    var password = "hello1";

    if (!email || !password) {
        return console.log("Email and password needed");
    }


});

app.post("/example", function(req, res) {
    var message = 'Hello ' + req.body.name + ' your email is ' + req.body.email;
    res.status(200).json({message : message});
});


//Sign Out user
app.get("/SignOut", function(req, res){
    var signOut = function(){
        firebase.auth().signOut();
    };
    res.status(200).json({message : "successfully signed out"});

});
