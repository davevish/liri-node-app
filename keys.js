console.log('this is loaded');

var twitterKeys = {
  consumer_key: '<35mEKJSjtcBNHWaipVN4o7fLx>',
  consumer_secret: '<g80oqVnJqiaAjKGuL1Ty9FL80dT7JqTgJxvJr8F5o0bbJZnRku>',
  access_token_key: '<213255676-oNcZkNvq7BoHfKmmNrLbrV8bj6XbH5n0obA9SoDj>',
  access_token_secret: '<kThDeAeS6DZAFHRdUFAKwJm9ySXGobSDO5bUS9G7W51KW>',
}

var spotifyKeys = {
    client_id: '0cc0eb1c849b44deb308649ce73e12cc',
    client_secret: 'c123088cfbf74039aa5786afc5aac0e5'
};

var omdbKey = {
    API_key: '40e9cece'
};

var allKeys = {
    twitter: twitterKeys,
    spotify: spotifyKeys,
    omdb: omdbKey
};

module.exports = allKeys;