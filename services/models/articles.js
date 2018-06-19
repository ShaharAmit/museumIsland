const mongoose = require('mongoose'),
      articles = new mongoose.Schema({
        museum: String,
        article_name: String,
        author: String,
        genre: String,
        timestamp: String,
        content: String,
        picture: String
      }, {collection: 'Articles'});

const Articles = mongoose.model('Articles', articles);

module.exports = Articles;