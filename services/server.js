const express = require('express'),
    app = express(),
    galleriesCtl = require('./controllers/galleries.ctl'),
    articlesCtl = require('./controllers/articles.ctl'),
    museumsCtl = require('./controllers/museums.ctl'),
    artistsCtl = require('./controllers/artists.ctl'),
    usersCtl = require('./controllers/users.ctl');
var bodyParser = require('body-parser');

    port = process.env.PORT || 3000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
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

//get artist by gallery
app.get('/get_artist/:gallery',artistsCtl.artistByGallery);

//get museums by gallery
app.get('/museum/:gallery',museumsCtl.museumsByGallery);

//get article by article name and author 
app.post('/article',articlesCtl.getArticleByNA);

//get one article by date from each genre
app.get('/each_genre_article',articlesCtl.articlesByDG);

//add museum to following
app.post('/add_following_museum',usersCtl.addMuseumToFollowing);
    
//remove museum from following
app.post('/remove_following_museum',usersCtl.removeMuseumFromFollowing);

//add museum to discount museums
app.post('/add_dicounted_museum',usersCtl.addMuseumToDiscounts);

//add gallery to paid galleries
app.post('/add_paid_gallery/Gallery',usersCtl.addGalleryToPaid);

//add item to paid items
app.post('/add_paid_object/Object',usersCtl.addObjectToPaid);

//create gallery
app.post('/create_gallery',galleriesCtl.createGallery);

//get pictures by preferences
app.post('/preferences',galleriesCtl.getPicturesByPreferences);

//get galleries by date
app.get('/get_galleries',galleriesCtl.galleriesByDate);

//get pictures from paid gallery
app.get('/pictures/:gallery',galleriesCtl.picturesByGallery);

//get galleries by artist
app.get('/galleries_by_artis/:artist',galleriesCtl.galleriesByArtist);

//API - index.html file
app.get('/', (req, res) => {
    res.sendfile('index.html');
});

app.all('*', (req,res) => {
    res.status(404).send({err: false, docs: 'wrong route'});
});


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});