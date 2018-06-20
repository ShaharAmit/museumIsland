const mongoose = require('mongoose'),
    users = new mongoose.Schema({
        username: { type: String, required: true, index: { unique: true } },
        password: { type: String, required: true },
        name: {type: String, required: true},
        following: [String],
        purchases: [String],
        paid_galleries: [String],
        discounts_museums: [String],
        preferences: {} 
    }, {collection: 'Users'});

const Users = mongoose.model('Users', users);

module.exports = Users;
