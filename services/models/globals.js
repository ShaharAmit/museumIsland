const mongoose = require('mongoose'),
      globals = new mongoose.Schema({
        type: String,
        fields: [String]
      }, {collection: 'Globals'});

const Globals = mongoose.model('Globals', globals);

module.exports = Globals;
