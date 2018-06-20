const mongoose = require('mongoose'),
      articles = new mongoose.Schema({
        museum: {type: String, required: true},
        article_name: {type: String, required: true},
        author: {type: String, required: true},
        genre: {type: String, required: true},
        timestamp: {type: String, required: true},
        content: {type: String, required: true},
        picture: {type: String, required: true}
      }, {collection: 'Articles'});

const Articles = mongoose.model('Articles', articles);

module.exports = Articles;