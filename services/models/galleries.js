const mongoose = require('mongoose'),
      galleries = new mongoose.Schema({
        museum: String,
        gallery_name: String,
        artist: String,
        genre: String,
        timestamp: String,
        pictures: [String],
        price: String,
        description: String
      }, {collection: 'Galleries'});

const Galleries = mongoose.model('Galleries', galleries);

module.exports = Galleries;
