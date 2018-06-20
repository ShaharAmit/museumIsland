var json1 = {
    museum: "Louvre",
    gallery_name: "Power Plays",
    artist: "Christophe Fouin",
    genre: "Political Art",
    price: "50",
    description: "im a gallery"
};


var json2 = {
    pictures: [
        "https://firebasestorage.googleapis.com/v0/b/museum-island.appspot.com/o/exhibitions%2Fpower-plays%2F361401-369x500.jpg?alt=media&token=6000cacd-ce0c-4c9e-a842-2c27b8ff7df1",
        "https://firebasestorage.googleapis.com/v0/b/museum-island.appspot.com/o/exhibitions%2Fpower-plays%2F75727-500x399.jpg?alt=media&token=8ec2ab46-714e-4e10-8633-0cc01cd8f478",
        "https://firebasestorage.googleapis.com/v0/b/museum-island.appspot.com/o/exhibitions%2Fpower-plays%2F823211-349x500.jpg?alt=media&token=e0564142-5cf9-4db5-b09a-0b7e46904240"
    ]
};
var json3 = {
    "museum": "National Air and Space Museum",
    "article_name": "Civil War Ballooning",
    "author": "Nicole R",
    "content": "im an article",
    "genre": "War",
    "picture": "https://firebasestorage.googleapis.com/v0/b/museum-island.appspot.com/o/articles%2FCivil%20War%20Ballooning.jpg?alt=media&token=e531c529-8067-48b9-9857-b3233123ffbf"
};

var json4 = {
    "status": "successefully added museum {:museum} to following"
};
var json5 = {
    "status": "successefully removed museum {:museum} from  following"
};




document.getElementById("galleriesByArtist").innerHTML = JSON.stringify(json1, undefined, 2);
document.getElementById("picturesByGallery").innerHTML = JSON.stringify(json2, undefined, 2);
document.getElementById("getArticleById").innerHTML = JSON.stringify(json3, undefined, 2);
document.getElementById("followResponse").innerHTML = JSON.stringify(json4, undefined, 2);
document.getElementById("unFollowResponse").innerHTML = JSON.stringify(json5, undefined, 2);

