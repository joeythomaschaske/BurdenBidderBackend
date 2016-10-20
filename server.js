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
app.use(bodyParser.json());

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

/*  "/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

app.get("/contacts", function(req, res) {
    //var db = firebase.database();
    //var ref = db.ref("/");
    //var usersRef = ref.child("Accounts");
    //usersRef.set({
    //    EvansAccount: {
    //        id: "1234",
    //        full_name: "Evan Bauer"
    //    }, gracehop: {
    //        date_of_birth: "December 9, 1906",
    //        full_name: "Grace Hopper"
    //    }
    //});
    
    res.status(200).json({message : 'i updated JSON serviceAccountCredentials'});
});

app.post("/contacts", function(req, res) {
});

/*  "/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get("/contacts/:id", function(req, res) {
    res.status(200).json({message : "suck a dick evan"});
});

app.put("/contacts/:id", function(req, res) {
});

app.delete("/contacts/:id", function(req, res) {
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

app.post("example", function(req, res) {
    var email = req.email;
    var name = req.name;
    console.log('Hi ' + name + ' your email is ' + email);
});


//Sign Out user
app.get("/SignOut", function(req, res){
    var signOut = function(){
        firebase.auth().signOut();
    };
    res.status(200).json({message : "successfully signed out"});

});
