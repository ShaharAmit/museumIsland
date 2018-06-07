const mongoose = require('mongoose'),
      galleries = new mongoose.Schema({
        museum: String,
        gallery_name: String,
        artist: String,
        title: String,
        genre: String,
        timestamp: Date,
        pictures: [String]
      }, {collection: 'Galleries'});

const Galleries = mongoose.model('Galleries', galleries);

module.exports = Galleries;
