const mongoose = require('mongoose'),
    Museums = require('../models/museums');

function museumsByGallery(res,gallery) {
    Museums.find({galeries: gallery},(err, docs) => {
        if (err) console.log(`query error:${err}`);
        console.log(docs);
        res.json(docs);
    })
}

module.exports = {
    museumsByGallery
};