const mongoose = require('mongoose'),
    Galleries = require('../models/galleries'),
    Museums = require('./museums.ctl'),
    Users = require('./users.ctl');

//get
function galleriesByDate(req,res) {
    Galleries.find({},"picture gallery_name -_id",(err, docs) => {
            if (err) console.log(`query error:${err}`);
            console.log(docs);
            res.json(docs);
            return;
        }).sort({
            'timestamp': 'descending'
        })
        .limit(3);
}

//get
function galleriesByArtist(req, res) {
    const artist = req.params.artist;
    Galleries.find({
        artist: artist
    }, "picture gallery_name -_id", (err, docs) => {
        if (err) console.log(`query error:${err}`);
        console.log(docs);
        res.json(docs);
    })
}

//get
function picturesByGallery(req, res) {
    const gallery = req.params.gallery;
    Galleries.findOne({
        gallery_name: gallery
    }, "pictures -_id", (err, doc) => {
        if (err) console.log(`query error:${err}`);
        const pictures = doc.pictures.slice(0, 3);
        res.json({pictures: pictures});
    })
}

//post
function createGallery(req,res) {
    const params = req.body,
        museumName = params.museumName,
        museumID = params.museumID,
        galleryName = params.galleryName, 
        artist = params.artist, 
        genre = params.genre, 
        pictures = params.pictures, 
        price = params.price, 
        picture = params.picture,
        description = description.description;

    Museums.insertGallery(galleryName, museumName).then(() => {
        const gallery = new Galleries({
            museum: museumName,
            gallery_name: galleryName,
            artist: artist,
            genre: genre,
            timestamp: Date.now(),
            pictures: pictures,
            picture: picture,
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

//not by route
function galleryByDG(genre,lim) {
    console.log('genre',genre);
    return new Promise((res, rej) => { 
        Galleries.find({genre: genre},"pictures gallery_name -_id",(err, docs) => {
                if (err) {
                    console.log(`query error:${err}`);
                    rej(err);
                } else {
                    const obj = [];
                    docs.forEach(doc => {
                        const pictures = doc.pictures.slice(0, 3);
                        for(let i=0; i<3; i++) {
                            obj.push({
                                picture: pictures[i],
                                gallery: doc['gallery_name']
                            });
                        }
                    });
                    res(obj);
                }
            }).sort({'timestamp': 'descending'}).limit(lim);
        });
}

//post
function getPicturesByPreferences(req,res) {
    console.log('here');
    const userName = req.body.username;
    Users.getPreferences(userName).then(prefernces => {
        promises =[];
        if(prefernces.preferences) {
            genreSorted = Object.keys(prefernces.preferences).sort((a,b) => {return prefernces.preferences[b] - prefernces.preferences[a]})
            len = genreSorted.length;
            switch(len) {
                case 1:
                    promises.push(galleryByDG(genreSorted[0],3));
                    break;
                case 2:
                    promises.push(galleryByDG(genreSorted[0],3));
                    promises.push(galleryByDG(genreSorted[1],2));
                    break;
                default:
                    for(let i=0; i<3; i++) {
                        promises.push(galleryByDG(genreSorted[i],3-i));
                    }
                    break;
            }
            Promise.all(promises).then(obj => {
                const pictures = [];
                const objLen = obj.length;
                for(let k=0; k<objLen; k++) {
                    const picturesLen = obj[k].length;
                    for(let f=0; f<picturesLen; f++) {
                        pictures.push(obj[k][f]);
                    }
                }
                res.json(pictures);
            })
        } else {

        }
    })
}

module.exports = {
    galleriesByArtist,
    galleriesByDate,
    picturesByGallery,
    createGallery,
    getPicturesByPreferences
};