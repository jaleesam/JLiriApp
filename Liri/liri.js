require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var tweets = function () {
    var params = { screen_name: 'Jaccrea' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                //   console.log(tweets[i].created_at);
            }
            console.log(tweets);
        }
    });
}

var getSpotifyData = function (songData) {
    spotify.search({ type: 'track', query: songData }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data.tracks.items);
        for (var i = 0; i < data.tracks.items.length; i++) {
            console.log(data.tracks.items[i].album.name);
        }
    });
}

var getMovieData = function (movieData) {
    if (movieData === undefined) {
        movieData = "Mr Nobody";
    }

    var movieAPI = "http://www.omdbapi.com/?i=tt3896198&t=" + movieData + "&apikey=ef9e5f45";

    request(movieAPI, function (error, response, body) {

        var jsonData = JSON.parse(body);

        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('Title: ' + jsonData.Title); // Print the HTML for the Google homepage.
        console.log('Year: ' + jsonData.Year);
    });
}

var doIt = function () {
    fs.readFile('random.txt',"utf8", function(err, data) {
        // console.log(data);
        var dataArray = data.split(",");
        if (dataArray.length === 2){
            input(dataArray[0], dataArray[1]);
        }

        else if (dataArray.length === 1){
            input(dataArray[0]);
        }
      });
}


var input = function (command, functData) {
    switch (command) {
        case "my-tweets":
            tweets();
            break;
        case "spotify-this-song":
            getSpotifyData(functData);
            break;
        case "movie-this":
            getMovieData(functData);
            break;
        case "do-what-it-says":
            doIt();
            break;
        default:
            console.log("I didn't recognize any of your commands.");
    }

}


var main = function (arg1, arg2) {
    input(arg1, arg2);

}

main(process.argv[2], process.argv[3]);