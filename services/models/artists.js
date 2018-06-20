const mongoose = require('mongoose'),
    artists = new mongoose.Schema({
        museums: [String],
        galleries: [String],
        name:{type: String, required: true},
        about: [{type: String, required: true}],
        picture: {type: String, required: true}
        
    }, {collection: 'Artists'});

const Artists = mongoose.model('Artists', artists);
module.exports = Artists;
