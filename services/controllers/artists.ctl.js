const mongoose = require('mongoose'),
    Artists = require('../models/artists');

//get 
function artistByGallery(req,res) {
    const gallery = req.params.gallery;
    Artists.find({galleries: gallery},"-_id", (err, docs) => {
        if (err) console.log(`query error:${err}`);
        console.log(docs);
        res.json(docs);
    })
} 

module.exports = {
    artistByGallery
};
 