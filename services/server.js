const express = require('express'),
    app = express(),
    galleriesCtl = require('./controllers/galleries.ctl'),
    articlesCtl = require('./controllers/articles.ctl'),
    museumsCtl = require('./controllers/museums.ctl'),
    artistsCtl = require('./controllers/artists.ctl'),
    usersCtl = require('./controllers/users.ctl');

    port = process.env.PORT || 3000;

app.set('port', port);
app.use('/', express.static('./public')); //for API
app.use(
    (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type,Accept");
        res.set("Content-Type", "application/json");
        next();
    });
/*** All routes ***/

app.get('/', (req,res) => {
    const gallery = '12345',
        userID = 'museum_island.darkboyd'
    usersCtl.addMuseumToProfile(res,userID,gallery);
});
app.get('/:artist', (req,res) => {
    const artist = req.params.artist
    galleriesCtl.galleriesByArtist(res,artist);
});

app.get('/pictures/:gallery', (req,res) => {
    const gallery = req.params.gallery;
    galleriesCtl.picturesByGallery(res,gallery);
});

//get museums by gallery
app.get('/museum/:gallery', (req,res) => {
    const gallery = req.params.gallery;
    museumsCtl.museumsByGallery(res,gallery);
});

//get artists by gallery
app.get('/artist/:gallery', (req,res) => {
    const gallery = req.params.gallery;
    artistsCtl.artistByGallery(res,gallery);
});




app.listen(port,
    () => {
        console.log(`listening on port ${port}`);
    });