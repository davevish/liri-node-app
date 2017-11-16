var keys = require("./keys.js");
var fs = require("fs");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var inquirer = require("inquirer");
var moment = require("moment");
var input = process.argv[2];
var input2 = process.argv[3];
var allInput = process.argv;
var colors = require("colors");

for (var i = 4; i < allInput.length; i++) {
     input2 += "+" + allInput[i];
}
var song;
var MovieTitle;
if (!input) {
     console.log("Pick a line below:");
     console.log("node liri.js tweets");
     console.log("node liri.js spotifysongs 'Name of song'");
     console.log("node liri.js movie-info 'Movie Title'");
     console.log("node liri.js do-what-it-says");
}
switch (input) {
     case "tweets":
     displayTweets();
     break;
     case "spotifysongs":
     spotifyMe();
     break;
     case "movie-info":
     movieMe();
     break;
     case "do-what-it-says":
     doThis();
     break;
}
function displayTweets() {
//      var param = {
//           screen_name: 'LewisHamilton'
//      };
//      var client = new Twitter({
//        consumer_key: keys.consumer_key,
//        consumer_secret: keys.consumer_secret,
//        access_token_key: keys.access_token_key,
//        access_token_secret: keys.access_token_secret
//      });
//      client.get('statuses/user_timeline', param, function (err, tweets, response) {
//           if (!err) {
//                for (var i=0; i < tweets.length; i++) {
//                     console.log(param.screen_name + " tweeted: " + tweets[i].text);
//                }
//           }
//      });
     inquirer
     .prompt([
          {
               type: "input",
               message: "Type in the exact twitter username (LewisHamilton)",
               name: "screenName",
               default: "twitter"
          }
     ])
     .then(function (inquirerResponse) {
          if (inquirerResponse) {
                    var param = {
                         screen_name: inquirerResponse.screenName
                    };
               var client = new Twitter({
                    consumer_key: keys.twitter.consumer_key,
                    consumer_secret: keys.twitter.consumer_secret,
                    access_token_key: keys.twitter.access_token_key,
                    access_token_secret: keys.twitter.access_token_secret
               });
               client.get('statuses/user_timeline', param, function (err, tweets, response) {
                    if (!err) {
                         for (var i = 0; i < tweets.length; i++) {
                              var date = moment(tweets[i].created_at).format('MMMM Do YYYY, h:mm:ss a');
                              var displayTweets = "On " + date + " @" + inquirerResponse.screenName + " tweeted: " + tweets[i].text;
                              console.log("On " + date.magenta + " @" + inquirerResponse.screenName.blue + " tweeted: " + tweets[i].text);
                              console.log("---------------------------------------------------------");
                         }
                    } else if (err) {
                         console.log("This is not the exact name, try again." + err);
                    }
               })
          }
     })
}
function spotifyMe() {
     if (!input2) {
          song = 'the stroke';
     } else {
          song = input2;
     }
     var newSpotify = new Spotify({
          id: keys.spotify.client_id,
          secret: keys.spotify.client_secret
     });
     newSpotify.search({
     type: 'track', query: song, limit: 2}, function (err, data) {
               if (err) {
                    console.log("That didn't work!" + err);
               }
          if (!err) {
               var dataItems = data.tracks.items;
               for (var i = 0; i < dataItems.length;i++) {
                         var songName = "Song Name: " + dataItems[i].name;
                         var artistName = "Artist: " + dataItems[i].artists[0].name;
                         var preview = "Preview: " + dataItems[i].preview_url;
                         var albumName = "Album Title: " + dataItems[i].album.name;
                    if (preview === null) {
                         preview = "Oops pick a different song!"
                    }
                         console.log("Song Name: ".bold + dataItems[i].name);
                         console.log("Artist: ".bold + dataItems[i].artists[0].name);
                         console.log("Preview: ".bold + dataItems[i].preview_url);
                         console.log("Album Title: ".bold + dataItems[i].album.name);
                         console.log("---------------------------------------------------------");
               }
          }
     });
//      inquirer
//      .prompt([
//           {
//                type: "input",
//                message: "Pick a song!",
//                name: "songTitle"
//           }
//      ])
//      .then(function (inquirerResponse) {
//           if (inquirerResponse) {
//                MovieTitle = inquirerResponse.songTitle;
//           } else {
//                MovieTitle = "The Stroke"
//           }
//           var newSpotify = new Spotify({
//                id: keys.client_id,
//                secret: keys.client_secret
//           });
//           newSpotify.search({
//           type: "track", query: MovieTitle}, function (err, data) {
//                if (err) {
//                          console.log("Yikes, different song?" + err);
//                }
//                console.log(data);
//           })
//      })
}
function movieMe() {
     if(!input2) {
          MovieTitle = "Drive";
     } else {
          MovieTitle = input2;
     }
     console.log("Movie Information  " + MovieTitle);
     var queryURL = "http://www.omdbapi.com/?t=" + MovieTitle + "&y=&plot=short?&apikey=" + keys.omdb.API_key;
     request(queryURL, function(err, response, body) {
          if (err) {
               console.log("This movie doesn't exist, try again!");
          }
          var title = "Movie Title: ".bold + JSON.parse(body).Title;
          var year = "Year Release: ".bold + JSON.parse(body).Year;
          var imdbRating = "IMDB Rating: ".bold + JSON.parse(body).Ratings[0].Value;
          var rottenTomato = "Rotten Tomatoes Rating: ".bold + JSON.parse(body).Ratings[1].Value;
          var country = "Country Produced: ".bold + JSON.parse(body).Country;
          var language = "Language: ".bold + JSON.parse(body).Language;
          var plot = "Plot: ".bold + JSON.parse(body).Plot;
          var actors = "Actors: ".bold + JSON.parse(body).Actors;
          var movieInfo = [title, year, imdbRating, rottenTomato, country, language, plot, actors];
          if (!err && response.statusCode === 200) {
               movieInfo.forEach(function(variable) {
                    console.log(variable);
               });
               console.log("---------------------------------------------------------");
          }
     })
}
function doThis() {
     console.log("Pulling from 'random.txt'");
     fs.readFile("random.txt", "utf8", function (err, data) {
          if (err) {
               console.log("Error!! " + err);
          }
          var text = data.split(",");
          input = text[0];
          input2 = text[1];
          for (var i = 4; i < allInput.length; i++) {
               input2 += "+" + allInput[i];
          }
          spotifyMe();
     })
}
