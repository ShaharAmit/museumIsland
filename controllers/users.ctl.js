const mongoose = require('mongoose'),
    Users = require('../models/users');
    
//post
function addMuseumToFollowing(req, res) {
    const params = req.body;
    username = params.username,
        museum = params.museum;
    Users.findOne({
        username: username
    }, 'following -_id').then((doc) => {
        return doc.following;
    }).then(following => {
        const newFollowing = following;
        newFollowing.push(museum);
        Users.update({
            username: username
        }, {
            $set: {
                following: newFollowing
            }
        }, (err, docs) => {
            if (err) {
                console.log(`query error:${err}`)
                res.status(404).send({
                    err: true
                })
            } else {
                res.status(200).send({
                    err: false,
                    docs: 'true'
                })
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(404).send({
            err: true
        })
    });
}

//post
function removeMuseumFromFollowing(req, res) {
    const params = req.body;
    username = params.username,
        museum = params.museum;
    Users.findOne({
        username: username
    }, 'following -_id').then((doc) => {
        return doc.following;
    }).then(following => {
        let newFollowing = following,
            filterFollowing = [];
        filterFollowing.push(museum);
        newFollowing = newFollowing.filter((el) => !filterFollowing.includes(el));
        Users.update({
            username: username
        }, {
            $set: {
                following: newFollowing
            }
        }, (err, docs) => {
            if (err) {
                console.log(`query error:${err}`)
                res.status(404).send({
                    err: true
                })
            } else {
                res.status(200).send({
                    err: false,
                    docs: true
                })
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(404).send({
            err: true
        })
    });
}

//post
function checkForDiscount(req, res) {
    const params = req.body;
    username = params.username;
    museum = params.museum;
    Users.findOne({
        username: username,
        discounts_museums: museum
    }, 'discounts_museums -_id', (err, doc) => {
        if (err) {
            console.log(err);
            res.status(404).send({
                err: true
            });
        } else {
            if (doc && doc.discounts_museums) {
                res.status(200).send({
                    err: false,
                    docs: true
                })
            } else {
                res.status(200).send({
                    err: false,
                    docs: false
                })
            }
        }
    }).catch(err => {
        console.log(err);
        res.status(404).send({
            err: true
        });
    });
}

//post
function addMuseumToDiscounts(req, res) {
    const params = req.body;
    username = params.username,
        museum = params.museum;
    Users.findOne({
        username: username
    }, 'discounts_museums -_id').then((doc) => {
        return doc.discounts_museums;
    }).then(discounts_museums => {
        let newDiscount = [];
        if(discounts_museums) {
            newDiscount = discounts_museums;
        }
        newDiscount.push(museum);
        Users.update({
            username: username
        }, {
            $set: {
                discounts_museums: newDiscount
            }
        }, (err, docs) => {
            if (err) {
                console.log(`query error:${err}`)
                res.status(404).send({
                    err: true
                })
            } else {
                res.status(200).send({
                    err: false,
                    docs: 'true'
                })
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(404).send({
            err: true
        })
    });
}

function checkPaidGalleries(req, res) {
    const params = req.body,
        username = params.username,
        gallery = params.gallery;
    Users.findOne({
        username: username,
        paid_galleries: gallery
    }, 'paid_galleries -_id', (err, doc) => {
        if (err) {
            res.status(404).send({err: true});
        } else {
            if (doc && doc.paid_galleries) {
                res.status(200).send({
                    err: false,
                    docs: true
                })
            } else {
                res.status(200).send({
                    err: false,
                    docs: false
                })
            }
        }
    });
}

//post
function addGalleryToPaid(req,res) {
    const params = req.body;
    username = params.username,
    gallery = params.gallery,
    genre = params.genre,
    promises = [];
    Users.findOne({
        username: username
    }, 'paid_galleries -_id').then((doc) => {
        return doc.paid_galleries;
    }).then(paid_galleries => {
        const newpaidGalleries = paid_galleries;
        newpaidGalleries.push(gallery);
        return newpaidGalleries;
    }).then(paid => {
        if (paid) {
            Users.update({
                username: username
            }, {
                $set: {
                    paid_galleries: paid
                }
            }, (err, docs) => {
                if (err) {
                    console.log(err);
                    return false;
                }
                return docs;
            }).then((docs) => {
                if (docs) {
                    promises.push(updatePreferences(username, 'gallery', {genre: genre}));
                    Promise.all(promises).then(check => {
                        if(check[0]) {
                            res.status(200).send({
                                err: false,
                                docs: true
                            })
                        } else {
                            res.status(200).send({
                                err: false,
                                docs: false
                            })
                        }
                    });
                }
            }).catch(err => {
                console.log(err);
                res.status(404).send({
                    err: false,
                    docs: false
                })
            });
        } else {
            res.status(404).send({
                err: false,
                docs: false
            })
        }
    }).catch(err => {
        console.log(err);
        res.status(404).send({
            err: false,
            docs: false
        })
    });
}

//post
function addObjectToPaid(req,res) {
    const params = req.body;
    username = params.username,
    item = params.item,
    genre = params.genre,
    promises = [];
    Users.findOne({
        username: username
    }, 'purchases -_id').then((doc) => {
        return doc.purchases;
    }).then(purchases => {
        const newPaidObj = purchases;
        newPaidObj.push(item);
        return newPaidObj;
    }).then(purchase => {
        if(purchase) {
            Users.update({
                username: username
            }, {
                $set: {
                    purchases: purchase
                }
            }, (err, docs) => {
                if (err) {
                    console.log(err);
                    return false;
                }
                return docs;
            }).then((docs) => {
                if (docs) {
                    promises.push(updatePreferences(username, 'item', {genre: genre}));
                    Promise.all(promises).then(check => {
                        if(check[0]) {
                            res.status(200).send({
                                err: false,
                                docs: true
                            })
                        } else {
                            res.status(200).send({
                                err: false,
                                docs: false
                            })
                        }
                    });
                }
            }).catch(err => {
                console.log(err);
                res.status(404).send({
                    err: false,
                    docs: false
                })
            });
        } else {
            res.status(404).send({
                err: false,
                docs: false
            })
        }
    }).catch(err => {
        console.log(err);
        res.status(404).send({
            err: false,
            docs: false
        })
    });
}

//not by route
function updatePreferences(username, event, doc) {
    const genre = doc.genre,
    promises = [];
    console.log('genre',genre);

    return Users.findOne({
        username: username
    }, 'preferences -_id').then((doc) => {
        return doc.preferences;
    }).then(preferences => {
        let newPreferences = preferences;
        if (!newPreferences) {
            newPreferences = {};
        }
        switch (event) {
            case 'news':
                if (newPreferences[genre]) {
                    newPreferences[genre] = newPreferences[genre] + 1;
                } else {
                    newPreferences[genre] = 1;
                }
                break;
            case 'gallery':
                if (newPreferences[genre]) {
                    newPreferences[genre] = newPreferences[genre] + 5;
                } else {
                    newPreferences[genre] = 5;
                }
                break;
            case 'item':
                if (newPreferences[genre]) {
                    newPreferences[genre] = newPreferences[genre] + 3;
                } else {
                    newPreferences[genre] = 3;
                }
                break;
        }
        promises.push(Users.update({
            username: username
        }, {
            $set: {
                preferences: newPreferences
            }
        }, (err, docs) => {
            if (err) console.log(`query error:${err}`)
            else {console.log('success'); return true}
        }));
        const check = Promise.all(promises).then(() => {return true});
        return check;
    }).catch(err => console.log(err));
}

function checkUserExist(req,res) {
    const username = req.body.username;
    Users.findOne({username: username},"username -_id",(err, docs) => {
        if (err) {
            console.log(`query error:${err}`);
            res.status(404).send({err: true})
        } else {
            res.status(200).send({err: false, docs: docs})
        }
    });
}

//not by route
function getPreferences(userName) {
    return Users.findOne({
        username: userName
    }, "preferences -_id");
}

function getUserData(req, res) {
    const params = req.body;
    username = params.username;
    Users.findOne({
        username: username
    },(err, docs) => {
        if(err) {
            res.status(404).send({err: true})
        } else {
            res.status(200).send({err: false, docs: docs})
        }
    });
}

module.exports = {
    addMuseumToDiscounts,
    removeMuseumFromFollowing,
    addMuseumToFollowing,
    addGalleryToPaid,
    addObjectToPaid,
    updatePreferences,
    getPreferences,
    checkForDiscount,
    checkPaidGalleries,
    checkUserExist,
    getUserData
};