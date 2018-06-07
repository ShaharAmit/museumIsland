const mongoose = require('mongoose'),
      articles = new mongoose.Schema({
        museum: String,
        article_name: String,
        author: String,
        title: String,
        genre: String,
        timestamp: String,
        sourceFiles: [String]
      }, {collection: 'Articles'});

const Articles = mongoose.model('Articles', articles);

module.exports = Articles;