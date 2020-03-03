const app_user = require('./app_user')
const app_recherche = require('./app_recherche')
const app_likes = require('./app_likes')
const app_playlist = require('./app_playlist')

// const config = require('./configDomain1');
// const config2 = require('./configDomain2');

app_user.listen(function() {
    console.log(`API REST running in http://localhost:3000`);
});

app_recherche.listen(function() {
    console.log(`API REST running in http://localhost:3001`);
});

app_likes.listen(function() {
    console.log(`API REST running in http://localhost:3002`);
});

app_playlist.listen(function() {
    console.log(`API REST running in http://localhost:3003`);
});