const express = require('express'),
    app = express(),
    galleriesCtl = require('./controllers/galleries.ctl'),
    articlesCtl = require('./controllers/articles.ctl'),
    museumsCtl = require('./controllers/museums.ctl');


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
    galleriesCtl.galleriesByDate(req,res);
});
app.get('/:artist', (req,res) => {
    galleriesCtl.galleriesByArtist(req,res,req.params.artist);
});

app.get('/pictures/:gallery', (req,res) => {
    galleriesCtl.picturesByGallery(req,res,req.params.gallery);
});

//get the latest articles by genre
app.get('/articles',(req,res) => {
    articlesCtl.areticleByDG(req,res,'genre');
});

//get museum by gallery
app.get('/museum/:gallery', (req,res) => {
    museumsCtl.museumsByGallery(req,res,req.params.gallery);
});


app.listen(port,
    () => {
        console.log(`listening on port ${port}`);
    });