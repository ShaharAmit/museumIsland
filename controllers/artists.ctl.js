const mongoose = require('mongoose'),
    Artists = require('../models/artists');

//get 
function artistByGallery(req,res) {
    const gallery = req.params.gallery;
    Artists.find({galleries: gallery},"-_id", (err, docs) => {
        if (err) {
            console.log(`query error:${err}`)
            res.status(404).send({err: true})
        } else {
            res.status(200).send({err: false, docs: docs})
        }
    })
}   

module.exports = {
    artistByGallery
};
 