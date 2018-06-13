const mongoose = require('mongoose'),
    Users = require('../models/users');

function addMuseumToProfile(res,userID,gallery) {
        Users.findOne({user_id: userID}).then((doc) => {
            return doc.following;
        }).then(following => {    
            const newFollowing = following;
            newFollowing.push(gallery);
            Users.update({user_id: userID},{$set: {following: newFollowing}},(err, docs) => {
                if (err) console.log(`query error:${err}`);
                console.log(docs);
                res.json(docs);
            });
        }).catch(err => console.log(err));
}

module.exports = {
    addMuseumToProfile,
};