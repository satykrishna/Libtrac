var mongoose = require('mongoose');
var user = require('../app/models/user');
var success = 0;

exports.changePassword = function(username,oldPassword,newPassword,callbackfn) {

	user.find({
		'username':username,
		'password':oldPassword
	},function(err,userReceived){
		//console.log(userReceived.length);
		if(err)
			console.log(err)
		else{
			if(userReceived.length==1){
							console.log(username);
							user.findOne({username:username},function(err,doc){
								doc.password = newPassword;
								doc.save();
								callbackfn({'response':"Password Sucessfully Changed",'res':true});
							});
							//callbackfn({res:"Done save"});
			}
			callbackfn({'response':"Username and Password NOT matching",'res':false});
		}
	})
}

