var express = require("express");
var firebase = require("firebase");
var path = require("path");
var bodyParser = require("body-parser");

firebase.initializeApp({
    serviceAccount: "serviceAccountCredentials.json",
    databaseURL: "https://testheroku-42d1f.firebaseio.com"
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
    res.status(200).json({message : "good"});
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