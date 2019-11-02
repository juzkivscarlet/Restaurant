// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Create variables 
// ===========================

var reservations = [];
var waitlist = [];

var Customer = function(name,email,phone,id) {
	this.name = name;
	this.email = email;
	this.phoneNumber = phone;
	this.id = id;
	if(reservations.length>4) this.waiting = true;
	else this.waiting = false;
};

var cust1 = new Customer("Bob Ross", "bob.ross@god.net", "5", "GO-single-D");

var cust2 = new Customer("Richard Simmons", "richard.simmons@aol.gov", "666", "Eggs");

var cust3 = new Customer("Jason Phillips", "quadgodz6000@matrix.perc", "8008008000", "Quad God");

reservations.push(cust1);
reservations.push(cust2);
waitlist.push(cust3);

app.use(express.static(__dirname+"/public"));

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/tables", function(req,res) {
	res.sendFile(path.join(__dirname, "public/tables.html"));
});

app.get("/reserve", function(req,res) {
	res.sendFile(path.join(__dirname, "public/reserve.html"));
});

app.get("/api/tables", function(req,res) {
	return res.json(reservations);
});

app.get("/api/waitlist", function(req,res) {
	return res.json(waitlist);
});

app.post("/api/tables", function(req,res) {
	var newCustomer = req.body;
	console.log(newCustomer);
	reservations.push(newCustomer);
	res.json(newCustomer);
});

app.post("/api/waitlist", function(req,res) {
	var newCustomer = req.body;
	console.log(newCustomer);
	waitlist.push(newCustomer);
	res.json(newCustomer);
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
