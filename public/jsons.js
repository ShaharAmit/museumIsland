var json1 = {
    "err": false,
    "docs": [
        {
            "museums": [
                "Louvre"
            ],
            "galleries": [
                "Power Plays"
            ],
            "name": "Christophe Fouin",
            "about": [
                "hey, im an artist"
            ],
            "picture": "me.png"
        }
    ]
};

var json2 = {
    "err": false,
    "docs": [
        {
            "museum_name": "Louvre",
            "galleries": [
                "Power Plays",
                "Delacroix",
                "In Society"
            ],
            "articles": [
                "Museums and politics: the Louvre, Paris"
            ],
            "items_for_sale": [
                {
                    "name": "item1",
                    "genre": "War",
                    "price": "20",
                    "description": "im an item"
                },
                {
                    "name": "item2",
                    "genre": "History",
                    "price": "20",
                    "description": "im an item"
                },
                {
                    "name": "item3",
                    "genre": "History",
                    "price": "20",
                    "description": "im an item"
                },
                {
                    "name": "item4",
                    "genre": "History",
                    "price": "20",
                    "description": "im an item"
                },
                {
                    "name": "item5",
                    "genre": "Tradition",
                    "price": "20",
                    "description": "im an item"
                }
            ],
            "picture": "museum.png"
        }
    ]
};

var json3 = {
    "err": false,
    "docs": [
        {
            "article_name": "Civil War Ballooning",
            "author": "Nicole R",
            "genre": "War",
            "picture": "https://firebasestorage.googleapis.com/v0/b/museum-island.appspot.com/o/articles%2FCivil%20War%20Ballooning.jpg?alt=media&token=e531c529-8067-48b9-9857-b3233123ffbf"
        },
        {
            "article_name": "Apollo",
            "author": "Michael G",
            "genre": "Space",
            "picture": "https://firebasestorage.googleapis.com/v0/b/museum-island.appspot.com/o/articles%2Fapollo11.jpg?alt=media&token=d302cc7a-ff76-45b7-ae90-10708f5868cb"
        },
        {
            "article_name": "Museums and politics: the Louvre, Paris",
            "author": "Jeff B",
            "genre": "Political Art",
            "picture": "https://firebasestorage.googleapis.com/v0/b/museum-island.appspot.com/o/articles%2FMuseums%20and%20politics-%20the%20Louvre%2C%20Paris.jpg?alt=media&token=753af20a-1043-4d0c-aa34-cb2e01ee412d"
        },
        null,
        null,
        null
    ]
};

var json6 = {
    pictures: [
        "https://firebasestorage.googleapis.com/v0/b/museum-island.appspot.com/o/exhibitions%2Fpower-plays%2F361401-369x500.jpg?alt=media&token=6000cacd-ce0c-4c9e-a842-2c27b8ff7df1",
        "https://firebasestorage.googleapis.com/v0/b/museum-island.appspot.com/o/exhibitions%2Fpower-plays%2F75727-500x399.jpg?alt=media&token=8ec2ab46-714e-4e10-8633-0cc01cd8f478",
        "https://firebasestorage.googleapis.com/v0/b/museum-island.appspot.com/o/exhibitions%2Fpower-plays%2F823211-349x500.jpg?alt=media&token=e0564142-5cf9-4db5-b09a-0b7e46904240"
    ]
};
var json7 = {
    "museum": "National Air and Space Museum",
    "article_name": "Civil War Ballooning",
    "author": "Nicole R",
    "content": "im an article",
    "genre": "War",
    "picture": "https://firebasestorage.googleapis.com/v0/b/museum-island.appspot.com/o/articles%2FCivil%20War%20Ballooning.jpg?alt=media&token=e531c529-8067-48b9-9857-b3233123ffbf"
};

var json4 =
{
    "err": false,
    "docs": "true"
};

var json5 ={
        "err": false,
        "docs": "success"
    };
var json6 = {
    "err": false,
    "docs": [
        {
            "picture": "https://firebasestorage.googleapis.com/v0/b/museum-island.appspot.com/o/exhibitions%2Fpower-plays%2F361401-369x500.jpg?alt=media&token=6000cacd-ce0c-4c9e-a842-2c27b8ff7df1",
            "gallery": "Power Plays"
        },
        {
            "picture": "https://firebasestorage.googleapis.com/v0/b/museum-island.appspot.com/o/exhibitions%2Fpower-plays%2F75727-500x399.jpg?alt=media&token=8ec2ab46-714e-4e10-8633-0cc01cd8f478",
            "gallery": "Power Plays"
        },
        {
            "picture": "https://firebasestorage.googleapis.com/v0/b/museum-island.appspot.com/o/exhibitions%2Fpower-plays%2F823211-349x500.jpg?alt=media&token=e0564142-5cf9-4db5-b09a-0b7e46904240",
            "gallery": "Power Plays"
        }
    ]
};
var json7 = {
    "err": false,
    "docs": [
        {
            "gallery_name": "newgallery",
            "picture": "picture"
        },
        {
            "gallery_name": "Power Plays",
            "picture": "gallery.png"
        },
        {
            "gallery_name": "Destination Moon",
            "picture": "gallery.png"
        }
    ]
};
var json8 = {
    "err": false,
    "docs": [
        {
            "gallery_name": "Power Plays",
            "picture": "gallery.png"
        }
    ]
};
var json9 = {
    "err": false,
    "docs": {
        "article_name": "Civil War Ballooning",
        "author": "Nicole R",
        "content": "im an article",
        "genre": "War",
        "picture": "https://firebasestorage.googleapis.com/v0/b/museum-island.appspot.com/o/articles%2FCivil%20War%20Ballooning.jpg?alt=media&token=e531c529-8067-48b9-9857-b3233123ffbf"
    }
};


document.getElementById("artistByGallery").innerHTML = JSON.stringify(json1, undefined, 2);
document.getElementById("museumsByGallery").innerHTML = JSON.stringify(json2, undefined, 2);
document.getElementById("articlesByDG").innerHTML = JSON.stringify(json3, undefined, 2);
document.getElementById("followResponse").innerHTML = JSON.stringify(json4, undefined, 2);
document.getElementById("unFollowResponse").innerHTML = JSON.stringify(json4, undefined, 2);
document.getElementById("addGalleryToPaid").innerHTML = JSON.stringify(json4, undefined, 2);
document.getElementById("checkForDiscount").innerHTML = JSON.stringify(json4, undefined, 2);
document.getElementById("createGallery").innerHTML = JSON.stringify(json5, undefined, 2);
document.getElementById("preferences").innerHTML = JSON.stringify(json6, undefined, 2);
document.getElementById("galleriesByDate").innerHTML = JSON.stringify(json7, undefined, 2);
document.getElementById("galleriesByArtist").innerHTML = JSON.stringify(json8, undefined, 2);
document.getElementById("addMuseumToDiscounts").innerHTML = JSON.stringify(json4, undefined, 2);
document.getElementById("addObjectToPaid").innerHTML = JSON.stringify(json4, undefined, 2);
document.getElementById("getArticleById").innerHTML = JSON.stringify(json8, undefined, 2);
document.getElementById("getArticleByNA").innerHTML = JSON.stringify(json9, undefined, 2);


