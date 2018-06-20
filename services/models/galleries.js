const mongoose = require('mongoose'),
      galleries = new mongoose.Schema({
        museum: {type: String, required: true},
        gallery_name: {type: String, required: true},
        artist: {type: String, required: true},
        genre: {type: String, required: true},
        timestamp: {type: String, required: true},
        pictures: [{type: String, required: true}],
        price: {type: String, required: true},
        description: {type: String, required: true},
        picture: {type: String, required: true}
      }, {collection: 'Galleries'});

const Galleries = mongoose.model('Galleries', galleries);

module.exports = Galleries;
