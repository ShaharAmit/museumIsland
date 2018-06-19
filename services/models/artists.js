const mongoose = require('mongoose'),
    artists = new mongoose.Schema({
        museums: [String],
        galleries: [String],
        name:String,
        about: [String]
    }, {collection: 'Artists'});

const Artists = mongoose.model('Artists', artists);
module.exports = Artists;
