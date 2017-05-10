var elem = document.getElementById("square");
var songArray = [];


function randomItunes() {
    var randomNumberBetween0and19 = Math.floor(Math.random() * 99);
   
    var title = "Title : " + songArray[randomNumberBetween0and19].title;
    var artist = "Artist : " + songArray[randomNumberBetween0and19].artist;
    var category = "Genre : " + songArray[randomNumberBetween0and19].genre;
    var imagesrc = songArray[randomNumberBetween0and19].image;
    document.getElementById("h2").innerHTML =  title;
    document.getElementById("h21").innerHTML =  artist;
    document.getElementById("h22").innerHTML =  category;
    document.getElementById("imageid").src=imagesrc;
}

function randomHype(){
    $.getJSON("hypem.json", function(json) {
    console.log(json); // this will show the info it in firebug console
});
}

function musicSrcDelegate(){
   var src = document.getElementById("musicSource");
    var srcVal = src.value;
    if(srcVal == "itunes"){
        randomItunes();
    }
    if(srcVal == "hypemachine"){
        randomHype()
    }
    console.log(srcVal);
}
var url = "https://itunes.apple.com/WebObjects/MZStore.woa/wpa/MRSS/newreleases/sf=143441/limit=100/genre=7/explicit=true/rss.xml";
    
$.get(url, function (data) {
$(data).find("item").each(function () { 
        var el = $(this);
        var input = el.find("coverArt").text();
        var fields = input.split('http');
        var imageInput = "http" + fields[3];
   
        var Song = {"title": el.find("title").text(), 
                    "genre": el.find("category").text(),
                    "description": el.find("description").text(), 
                    "artist": el.find("artist").text(),
                    "image": imageInput
                   };
        songArray.push(Song);
//        console.log("------------------------");
//        console.log("title      : " + el.find("title").text());
//        console.log("Genre     : " + el.find("category").text());
//        console.log("description: " + el.find("description").text());
//        console.log("artist: " + el.find("artist").text());
    if(songArray[10] != undefined){
        console.log(songArray[10].image);
    }
    
    });
});





