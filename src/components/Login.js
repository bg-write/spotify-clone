import React from 'react';
import { Container } from 'react-bootstrap';
import spotifyIconBlack from '../assets/Spotify_Icon_RGB_Black.png';

// For a full list of Spotify data query parameters and values for our authorization URI ("Construct the authorization URI"): https://developer.spotify.com/documentation/general/guides/authorization-guide/

// Make sure REDIRECT_URI matches what's on your Developer Dashboard ("Dashboard" -> "Edit Settings" -> "Redirect URIs") and env: https://developer.spotify.com/. http://localhost:3000 or https://git.heroku.com/bg-spotify-clone-with-lyrics.git.

const GET = 'https://accounts.spotify.com/authorize';
const CLIENT_ID = '5082ad4ebe774438b665e8d896ba35bd';
const RESPONSE_TYPE = 'code';
const REDIRECT_URI = 'https://git.heroku.com/bg-spotify-clone-with-lyrics.git';
const SCOPE =
	'streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';

const AUTH_URL = `${GET}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`;

export default function Login() {
	return (
		<>
			<Container
				id="login-container"
				className="d-flex flex-column justify-content-center align-items-center"
			>
				<img
					id="login-logo"
					className="m-1"
					alt="spotify logo"
					src={spotifyIconBlack}
					loading="lazy"
				/>
				<a
					id="login-button"
					className="btn btn-success btn-lg m-1"
					href={AUTH_URL}
				>
					Login with Spotify
				</a>
			</Container>
		</>
	);
}
