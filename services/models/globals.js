const mongoose = require('mongoose'),
      globals = new mongoose.Schema({
        type: {type: String, required: true},
        fields: [{type: String, required: true}]
      }, {collection: 'Globals'});

const Globals = mongoose.model('Globals', globals);

module.exports = Globals;
