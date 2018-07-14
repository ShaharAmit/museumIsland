const mongoose = require('mongoose'),
    Galleries = require('../models/galleries'),
    Museums = require('./museums.ctl'),
    Users = require('./users.ctl'),
    globlasCtl = require('./globals.ctl');

//get
function galleriesByDate(req, res) {
    Galleries.find({}, "picture gallery_name -_id", (err, docs) => {
        if (err) {
            console.log(`query error:${err}`)
            res.status(404).send({
                err: true
            })
        } else {
            res.status(200).send({
                err: false,
                docs: docs
            })
        }
    }).sort({
        'timestamp': 'descending'
    }).limit(3);
}

//get
function galleriesByArtist(req, res) {
    const artist = req.params.artist;
    Galleries.find({
        artist: artist
    }, "picture gallery_name -_id", (err, docs) => {
        if (err) {
            console.log(`query error:${err}`)
            res.status(404).send({
                err: true
            })
        } else {
            res.status(200).send({
                err: false,
                docs: docs
            })
        }
    })
}

//get
function picturesByGallery(req, res) {
    const gallery = req.params.gallery;
    Galleries.findOne({
        gallery_name: gallery
    }, "pictures -_id", (err, doc) => {
        if (err) {
            console.log(`query error:${err}`)
            res.status(404).send({
                err: true
            });
        } else {
            let pictures=[];
            if(doc && doc.pictures) {
                pictures = doc.pictures.slice(0, 3);
            }
            res.status(200).send({
                err: false,
                docs: pictures
            })
        }
    }).catch(err => {
        console.log(`query error:${err}`)
        res.status(404).send({
            err: true
        });
    })
}

//post
function createGallery(req, res) {
    const params = req.body,
        museumName = params.museumName,
        galleryName = params.galleryName,
        artist = params.artist,
        genre = params.genre,
        pictures = params.pictures,
        price = params.price,
        picture = params.picture,
        description = params.description;

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
        console.log(gallery);
        gallery.save().then((doc) => {
            if (doc) {
                res.status(200).send({
                    err: false,
                    docs: 'success'
                })
            }
        }).catch(err => {
            console.log(err);
            res.status(404).send({
                err: true
            })
        });
    }).catch(err => {
        console.log(err);
        res.status(404).send({
            err: true
        })
    });
}

//not by route
//get gallery by date and genre
function galleryByDG(genre, lim) {
    console.log('genre', genre);
    return new Promise((res, rej) => {
        Galleries.find({
            genre: genre
        }, "pictures gallery_name -_id", (err, docs) => {
            if (err) {
                console.log(`query error:${err}`);
                rej(err);
            } else {
                const obj = [];
                docs.forEach(doc => {
                    const pictures = doc.pictures.slice(0, 3);
                    for (let i = 0; i < pictures.length; i++) {
                        obj.push({
                            picture: pictures[i],
                            gallery: doc['gallery_name']
                        });
                    }
                });
                res(obj);
            }
        }).sort({
            'timestamp': 'descending'
        }).limit(lim);
    });
}

//post
function getPicturesByPreferences(req, res) {
    const userName = req.body.username;
    Users.getPreferences(userName).then(prefernces => {
        promises = [];
        if (prefernces.preferences) {
            genreSorted = Object.keys(prefernces.preferences).sort((a, b) => {
                return prefernces.preferences[b] - prefernces.preferences[a]
            })
            len = genreSorted.length;
            switch (len) {
                case 1:
                    promises.push(galleryByDG(genreSorted[0], 3));
                    break;
                case 2:
                    promises.push(galleryByDG(genreSorted[0], 3));
                    promises.push(galleryByDG(genreSorted[1], 2));
                    break;
                default:
                    for (let i = 0; i < 3; i++) {
                        promises.push(galleryByDG(genreSorted[i], 3 - i));
                    }
                    break;
            }
            Promise.all(promises).then(obj => {
                const pictures = [];
                const objLen = obj.length;
                for (let k = 0; k < objLen; k++) {
                    const picturesLen = obj[k].length;
                    for (let f = 0; f < picturesLen; f++) {
                        pictures.push(obj[k][f]);
                    }
                }
                res.status(200).send({
                    err: false,
                    docs: pictures
                })
            })
        } else {
            var promises = [];
            globlasCtl.getGlobals('genre').then(genres => {
                fields = genres.fields;
                fields.forEach(genre => {
                    promises.push(Galleries.findOne({
                        genre: genre
                    }, "pictures gallery_name -_id", (err, doc) => {
                        if (err) console.log(`query error:${err}`);                            
                        return doc;
                    }).sort({
                        'timestamp': 'descending'
                    }).catch(err => {
                        res.status(404).send({
                            err: true
                        })
                    }));
                });
                Promise.all(promises).then(docs => {
                    const obj = [];
                    if(docs) {
                        for(let c=0; c<docs.length; c++) {
                            if(docs[c] && docs[c].pictures) {
                                const pictures = docs[c].pictures.slice(0, 3);
                                for (let x = 0; x < pictures.length; x++) {
                                    obj.push({
                                        picture: pictures[x],
                                        gallery: docs[c]['gallery_name']
                                    });
                                }
                            }
                        }
                    }
                    res.status(200).send({
                        err: false,
                        docs: obj
                    })
                }).catch(err => {
                    console.log(`query error:${err}`)
                    res.status(404).send({
                        err: true
                    })
                });
            }).catch(err => {
                console.log(`query error:${err}`)
                res.status(404).send({
                    err: true
                })
            });
        }
    }).catch(err => {
        console.log(`query error:${err}`)
            res.status(404).send({
            err: true
        })
    })
}

function addGalleryToPaid(req,res) {
    const params = req.body;
        username = params.username,
        gallery = params.gallery,
        promises = [];

    Galleries.findOne({
        gallery_name: gallery
    }, "genre -_id").then(doc => {
        if(doc) {
            promises.push(Users.addGalleryToPaid(username,gallery,doc));

            Promise.all(promises).then((check) => {
                if(check) {
                    res.status(200).send({
                        err: false,
                        docs: true
                    })
                } else {
                    res.status(404).send({
                        err: true
                    })
                }
            }).catch(err => {
                console.log(`query error:${err}`)
                res.status(404).send({
                    err: true
                });
            });
        } else {
            res.status(404).send({
                err: true
            });
        }
    }).catch(err => {
        console.log(`query error:${err}`)
        res.status(404).send({
            err: true
        });
    });
}

module.exports = {
    galleriesByArtist,
    galleriesByDate,
    picturesByGallery,
    createGallery,
    getPicturesByPreferences,
    addGalleryToPaid
};