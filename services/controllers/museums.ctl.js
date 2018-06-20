const mongoose = require('mongoose'),
    Museums = require('../models/museums');

//get
function museumsByGallery(req,res) {
    const gallery = req.params.gallery;
    Museums.find({galleries: gallery},"-_id",(err, docs) => {
        if (err) {
            console.log(`query error:${err}`)
            res.status(404).send({err: true})
        } else {
            res.status(200).send({err: false, docs: docs})
        }
    });
}
 
//not by route
function insertGallery (galleryName, museumName) {
    return Museums.findOne({
        museum_name: museumName
    },"galleries -_id").then((doc) => {
        return doc.galleries;
    }).then(galleries => {    
        const newGalleries = galleries;
        newGalleries.push(galleryName);
        return Museums.update({
            museum_name: museumName
        },{$set: {galleries: newGalleries}});
    });
}


module.exports = {
    museumsByGallery,
    insertGallery
};