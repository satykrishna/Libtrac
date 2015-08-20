var mongoose = require('mongoose');
var user = require('../app/models/user');
var friend = require('../app/models/friend');



exports.addfriend = function(username, friendname, callback )
{
	var newFriendList = new friend ({
		username : username,
		friendname : friendname,
	});

	user.find({username: friendname}, function(err, friend)
	{
		var len = friend.length
		if(len == 0){
			callback({'response': "Friend does not exist in user table"})
			return;
		}
	})

		/*else
		{
			*/
			friend.find({username:username}, function(err, users)
			{
				var length = users.length
				if(length == 0)
				{
					newFriendList.save(function(err)
					{
						callback({'response': "Username not present, adding username and his first friend to the list"})
					})
				}
				else
				{
					if (length == 1)
					{
						/*friend.findOne({username:username}, function(newFriend, err)

						{
							if(err)
							{
								console.log(err)
								return;
							}*/


							friend.update({username : username}, {$addToSet: {friendname : friendname}}, function(err, affected){

								if (err) throw err;
								callback({'response' : "New friend added to array"})
							})

						}
					}
				})

		//}
		

	}