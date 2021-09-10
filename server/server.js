require('dotenv').config();
const express = require('express');
const cors = require('cors');
const lyricsFinder = require('lyrics-finder');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
const path = require('path');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// UPDATE REDIRECT_URI BASED ON DEPLOYMENT.
const REDIRECT_URI = 'http://localhost:3000';
// const REDIRECT_URI = 'https://bg-spotify-clone-with-lyrics.herokuapp.com';

// Allows us to refresh our user sessions: https://github.com/thelinmichael/spotify-web-api-node ("Since the access token ...")
app.post('/refresh', (req, res) => {
	const refreshToken = req.body.refreshToken;
	const spotifyApi = new SpotifyWebApi({
		redirectUri: REDIRECT_URI,
		clientId: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
		refreshToken,
	});

	spotifyApi
		.refreshAccessToken()
		.then((data) => {
			res.json({
				accessToken: data.body.accessToken,
				expiresIn: data.body.expiresIn,
			});
		})
		.catch((err) => {
			console.log('refreshAccessToken ERROR', err);
		});
});

// Connecting our server to our Spotify credentials: https://github.com/thelinmichael/spotify-web-api-node ("The example below uses a hardcoded ...")
app.post('/login', (req, res) => {
	// The "code" returned as a query parameter to the redirect URI - create a variable so we can use it below.
	const code = req.body.code;
	const spotifyApi = new SpotifyWebApi({
		redirectUri: REDIRECT_URI,
		clientId: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
	});
	// After we can authorize that we have a code, we retrieves an access token, a refresh token, and a time when the token will expire.
	spotifyApi
		.authorizationCodeGrant(code)
		.then((data) => {
			res.json({
				accessToken: data.body.access_token,
				refreshToken: data.body.refresh_token,
				expiresIn: data.body.expires_in,
			});
		})
		.catch((err) => {
			console.log('authorizationCodeGrant ERROR', err);
		});
});

// Returns our song lyrics via lyricsFinder: https://www.npmjs.com/package/lyrics-finder
app.get('/lyrics', async (req, res) => {
	const lyrics =
		(await lyricsFinder(req.query.artist, req.query.track)) ||
		'No Lyrics Found, Sad!';
	res.json({ lyrics });
});

// For Heroku deployment
app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Define our PORT, first with our own, and then 5000 as a backup default.
const PORT = process.env.PORT || 5000;

// Specify what PORT we're listening on.
app.listen(PORT, (err) => {
	if (err) return console.log('PORT ERROR', err);
	console.log(`Express listening on port ${PORT}`);
});
