require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var tweets = function(){
    var params = {screen_name: 'Jaccrea'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
          for(var i=0; i < tweets.length; i++){
            //   console.log(tweets[i].created_at);
          }
        console.log(tweets);
      }
    });
}

var spotifyData = function(songData){
    spotify.search({ type: 'track', query: songData }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data.tracks.items); 
      for(var i=0; i< data.tracks.items.length; i++){
          console.log(data.tracks.items[i].album.name);
      }
      });
}

var movieData = function(){

}

var doIt = function(){

}


var input = function(command, functData){
    switch(command) {
        case "my-tweets":
           tweets();
            break;
        case "spotify-this-song":
            spotifyData(functData);
            break;
        case "movie-this":
            movieData(functData);
            break;
        case "do-what-it-says":
            doIt();
            break;
        default:
            console.log("I didn't recognize any of your commands.");
    }

}


var main = function(arg1, arg2){
    input(arg1, arg2);

}

main(process.argv[2], process.argv[3]);