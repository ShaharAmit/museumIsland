const mongoose = require('mongoose'),
    museums = new mongoose.Schema({
        museum_name: {type: String, required: true, index: { unique: true }},
        galleries: [String],
        articles: [String],
        "items_for_sale": [{
            name: String,
            genre: String,
            price: String,
            description: String
        }],
        picture: {type: String, required: true}
    }, {
        collection: 'Museums'
    });

const Museums = mongoose.model('Museums', museums);

module.exports = Museums;