const mongoose = require('mongoose'),
    Museums = require('../models/museums'),
    globlasCtl = require('./globals.ctl');

function museumsByGallery(req, res, gallery) {
    Museums.find({galeries: gallery},(err, docs) => {
        if (err) console.log(`query error:${err}`);
        console.log(docs);
        res.json(docs);
    })
}

module.exports = {
    museumsByGallery
};