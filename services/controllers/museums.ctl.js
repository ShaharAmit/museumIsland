const mongoose = require('mongoose'),
    Museums = require('../models/museums');

function museumsByGallery(res,gallery) {
    Museums.find({galleries: gallery},(err, docs) => {
        if (err) console.log(`query error:${err}`);
        console.log(docs);
        res.json(docs);
    })
}

function insertGallery (galleryName, museumID, museumName) {
    return Museums.findOne({
        _id: museumID, museum_name: museumName
    },"galleries -_id").then((doc) => {
        return doc.galleries;
    }).then(galleries => {    
        const newGalleries = galleries;
        newGalleries.push(galleryName);
        return Museums.update({
            _id: museumID, museum_name: museumName
        },{$set: {galleries: newGalleries}});
    });
}


module.exports = {
    museumsByGallery,
    insertGallery
};