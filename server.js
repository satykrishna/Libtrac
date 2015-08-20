// This file is the entry point for the app.

//===================================BASE SETUP======================================
// Create objects for all the dependency modules
var express = require('express');

var bodyParser = require('body-parser'); // extracting the contents of json
var morgan = require('morgan');        // logging
var mongoose   = require('mongoose');  // DB connection

var app = express();  // creating the express instance.
var port = 8190;  // If you change this , then change the port in sendJson.py as well.

//----------------BEGIN: PATH FOR ALL FUNCTIONS FOR DIFFERENT ROUTES SUPPORTED---------
var register = require('./config/register');
var changePassword = require('./config/changePassword');
var viewCapacity = require('./config/viewCapacity');
var viewSensorCapacity=require('./config/viewSensorCapacity');
var login = require ('./config/login')
var addfriend = require ('./config/addfriend')
//----------------BEGIN: PATH FOR ALL FUNCTIONS FOR DIFFERENT ROUTES SUPPORTED---------

// using the modules imported above.
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Cloud DB connection - log in to mongolab.com to see.
var username = "anurag"
var password = "anurag";
var address = '@ds053090.mongolab.com:53090/mobilecomputingtest';
var url = 'mongodb://' + username + ':' + password + address;


//Connect DB
mongoose.connect(url);
module.exports = mongoose.connection

//--------------------BEGIN: CODE FOR CALLING THE ROUTER-PYTHON SCRIPT REGULARLY ---------------------

var fs = require("fs");
var outputFilepath = "./sample.txt";
var routTable = require('./app/models/routTable');

var pythonScriptCallingFunction = function(){

var PythonShell = require('python-shell');
var scriptpath = "../sendJson.py";

PythonShell.run(scriptpath, function (err) {
  if (err)
  	console.log(err);

});



require('readline').createInterface({
    input: fs.createReadStream(outputFilepath),
    terminal: false
}).on('line', function(line){
   //console.log('Line: ' + line);
   	var dataArr = line.split(' ');

	var newRouterData = new routTable();
	newRouterData.ip = dataArr[0];
	newRouterData.mac = dataArr[1];
	newRouterData.device_name = dataArr[2];
	newRouterData.floor = 4;
	newRouterData.lib_name = "Marston";
	newRouterData.saved_on = new Date();


	var conditions = { mac: dataArr[1] };
	var update = { $set: { saved_on: new Date(), ip:dataArr[0],floor : 4, lib_name:"Marston",device_name:dataArr[2]}};
	var options = { upsert: true };
	var mycallback = function(err,result){
		if(err)
			console.log(err);
	}

	routTable.update(conditions, update, options, mycallback);



});//End of the linewise dealing function


}// End of function : pythonSciptCalling function

var setDelay = 300*1000; // This is the delay time for each call. Its in milli seconds.

setInterval(pythonScriptCallingFunction, setDelay);


//--------------------END: CODE FOR CALLING THE ROUTER-PYTHON SCRIPT REGULARLY ---------------------





//==================================ROUTE SETUP=====================================

var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
// do logging
//console.log('Pre-processing happening.');
next();
});

// This is just for testing. Android Client shall not handle this.
router.get('/', function(req, res) {
    res.json({ message: '!! welcome to our LibTrac !!' });
});

// Begin : Registration
router.route('/register')

	.post(function(req, res){
		var username = req.body.username;
		var password = req.body.password;
		var email_id = req.body.email_id;
		var mac_address = req.body.mac_address;
		//console.log('The username '+username);
		register.register(username, password, email_id, mac_address, function (found) {
			console.log(found);
		    res.json(found);
	});
});

//Begin: login 
router.route('/login')

	.post(function(req, res){
		var username = req.body.username;
		var password = req.body.password;
		//console.log('The username '+username);
		login.login(username, password, function (found) {
			console.log(found);
		    res.json(found);
	});
});

//Begin: add friend
	router.route('/addfriend')

	.post(function(req, res){
		var username = req.body.username;
		var friendname = req.body.friendname;
		//console.log('The username '+username);
		addfriend.addfriend(username, friendname, function (found) {
			console.log(found);
		    res.json(found);
	});
});

//Begin : changePassword
router.route('/changePassword')
	.post(function(req, res){
		var username = req.body.username;
		var oldPassword = req.body.oldPassword;
		var newPassword = req.body.newPassword;
		changePassword.changePassword(username, oldPassword, newPassword, function (result){
			console.log(result);
			res.json(result);
		});

	});

//---------------------------BEGIN : ROUTES BY RASHMI----------------------------------------------
router.route('/viewCapacity')
router.get('/viewCapacity', function(req, res) {
	var libraryList = {
      "libraries" : ['Marston', 'Smathers', 'West']
    };
    res.json(libraryList);
});

var lib_capacity_marston=120;
router.route('/viewCapacity/*')
router.get('/viewCapacity/*', function(req, res) {
	   var lib_name=req.url;
	   lib_name=lib_name.slice(14);

	  viewCapacity.viewCapacity(lib_name,function (routerCount) {
	  	console.log(routerCount,"routerCount")
	        viewSensorCapacity.viewSensorCapacity(lib_name,function (sensorCount){
			console.log(sensorCount,"sensorCount")
			var cap=Math.round((routerCount+sensorCount)*100/(2*lib_capacity_marston));
			cap=cap+"%";
			res.json({"lib_capacity":cap});
			});
      });

});

//---------------------------END: ROUTES BY RASHMI----------------------------------------------


// ---------------------------ALL OUR ROUTES END HERE--------------------------------------------


// all of our routes will be prefixed with /
app.use('/', router);


// START THE SERVER
// =============================================================================

app.listen(port);
console.log('The server runs on port ' + port);
