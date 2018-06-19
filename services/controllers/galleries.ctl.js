const mongoose = require('mongoose'),
    Galleries = require('../models/galleries'),
    Museums = require('./museums.ctl');

function getData(res) {
    Galleries.find({},(err, docs) => {
        if (err) console.log(`query error:${err}`);
        console.log(docs);
        res.json(docs);
        return;
    });
}

function galleriesByDate(res) {
    Galleries.find({}, (err, docs) => {
            if (err) console.log(`query error:${err}`);
            console.log(docs);
            res.json(docs);
            return;
        }).sort({
            'timestamp': 'descending'
        })
        .limit(3);
}


function galleriesByArtist(res, artist) {
    Galleries.find({
        artist: artist
    }, (err, docs) => {
        if (err) console.log(`query error:${err}`);
        console.log(docs);
        res.json(docs);
    })
}

function picturesByGallery(res, gallery) {
    Galleries.findOne({
        gallery_name: gallery
    }, "pictures -_id", (err, doc) => {
        if (err) console.log(`query error:${err}`);
        const pictures = doc.pictures.slice(0, 3);
        res.json({pictures: pictures});
    })
}

function createGallery(res, museumName, museumID, galleryName, artist, genre, pictures, price, description) {
    Museums.insertGallery(galleryName, museumID, museumName).then(() => {
        const gallery = new Galleries({
            museum: museumName,
            gallery_name: galleryName,
            artist: artist,
            genre: genre,
            timestamp: Date.now(),
            pictures: pictures,
            price: price,
            description: description
        })
        return gallery.save(err => {
            if(err) {
                return err;
            } else {
                return true;
            }
        });
    }).then(() => {
        console.log('gallery created');
        res.json({created: 'gallery created'})
    }).catch(err => {
        console.log(err);
        res.json({created: 'could not create gallery this moment'});
    });

}

module.exports = {
    galleriesByArtist,
    galleriesByDate,
    picturesByGallery,
    getData,
    createGallery
};