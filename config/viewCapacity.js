var mongoose = require("mongoose");
var routTable = require('../app/models/routTable');
exports.viewCapacity=function(callback) {
	
	
	var previousDate = new Date();
	previousDate.setMinutes(previousDate.getMinutes()-40000);
	routTable.count({saved_on:{$gt:previousDate}},function(err, routers){
	console.log(routers);
		if (!err) {
					 callback(routers);
				  }
		else	  {
					 console.log(err);
			      }
		
	})
}
