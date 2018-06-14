const mongoose = require('mongoose'),
    Artists = require('../models/artists');

function artistByGallery(req, res, gallery) {
    Artists.find({galleries: gallery}, (err, docs) => {
        if (err) console.log(`query error:${err}`);
        console.log(docs);
        res.json(docs);
    })
}

module.exports = {
    artistByGallery
};
