var songArray: Array = [];
var globalCounter: number = 0;


var hypeJson: JSON;
$.getJSON("http://www.michaelarojas.com/AlbumMe/hypem.json", function(json) {
  hypeJson = json;
});

var rapJson: JSON;
$.getJSON("http://www.michaelarojas.com/AlbumMe/hiphop.json", function(json) {
  rapJson = json;
});

function randomItunes() {
    var randomNumberBetween0and19 = Math.floor(Math.random() * 99);
   
    var title = "Title : " + songArray[randomNumberBetween0and19].title;
    var artist = "Artist : " + songArray[randomNumberBetween0and19].artist;
    var category = "Genre : " + songArray[randomNumberBetween0and19].genre;
    var imagesrc = songArray[randomNumberBetween0and19].image;
    document.getElementById("h2").innerHTML =  title;
    document.getElementById("h21").innerHTML =  artist;
    document.getElementById("h22").innerHTML =  category;
    (<HTMLImageElement>document.getElementById("imageid")).src=imagesrc;
}

function randomHype(){
    if(globalCounter != 20){
        globalCounter = globalCounter + 1;
    }else{
        globalCounter = 0;
    }
    document.getElementById("h2").innerHTML =  hypeJson.songs[globalCounter].track;
    document.getElementById("h21").innerHTML =  hypeJson.songs[globalCounter].artist;
    document.getElementById("h22").innerHTML =  "";
    (<HTMLImageElement>document.getElementById("imageid")).src="hypem.png";
}

function randomRap(){
    if(globalCounter != 20){
        globalCounter = globalCounter + 1;
    }else{
        globalCounter = 0;
    }
    document.getElementById("h2").innerHTML =  rapJson.songs[globalCounter].track;
    document.getElementById("h21").innerHTML =  rapJson.songs[globalCounter].artist;
    document.getElementById("h22").innerHTML =  "";
    (<HTMLImageElement>document.getElementById("imageid")).src="hothiphop.png";
}

function musicSrcDelegate(){
   var src = document.getElementById("musicSource");
    var srcVal = (<HTMLInputElement>src).value;
    if(srcVal == "itunes"){
        randomItunes();
    }
    if(srcVal == "hypemachine"){
        randomHype();
    }
    if(srcVal == "rap"){
        randomRap();
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
    
    });
});





