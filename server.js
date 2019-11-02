// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Create variables 
// ===========================

var waitlist = [];
var reservations = [];

var Customer = function(name,email,phone,id) {
	this.name = name;
	this.email = email;
	this.phoneNumber = phone;
	this.id = id;
	if(reservations.length>5) waitlist.push(this);
	else reservations.push(this);
};

app.use(express.static(__dirname+"/public"));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/home.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "public/tables.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "public/reserve.html"));
});

app.get("/api/tables", function(req, res) {
    return res.json(reservations);
});

app.get("/api/waitlist", function(req, res) {
    return res.json(waitlist);
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
