const mongoose = require('mongoose'),
    users = new mongoose.Schema({
        user_id: String,
        name: String,
        following: [String],
        purchases: [String],
        paid_galleries: [String],
        discounts_museums: [String],
    }, {collection: 'Users'});

const Users = mongoose.model('Users', users);

module.exports = Users;
