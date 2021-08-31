import React from 'react';
import { Container } from 'react-bootstrap';

// For a full list of Spotify data query parameters and values for our authorization URI ("Construct the authorization URI"): https://developer.spotify.com/documentation/general/guides/authorization-guide/

// Make sure REDIRECT_URI matches what's on your Developer Dashboard ("Dashboard" -> "Edit Settings" -> "Redirect URIs"): https://developer.spotify.com/

const GET = 'https://accounts.spotify.com/authorize';
const CLIENT_ID = '5082ad4ebe774438b665e8d896ba35bd';
const RESPONSE_TYPE = 'code';
const REDIRECT_URI = 'http://localhost:3000';
const SCOPE =
	'streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';

const AUTH_URL = `${GET}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`;

export default function Login() {
	// TO-DO: ADD SPINNING SPOTIFY LOGO TO HOVER OVER LOGIN BUTTON, LIKE BIG D'OH DONUT.
	return (
		<>
			<Container
				id="login-container"
				className="d-flex flex-column justify-content-center align-items-center"
			>
				<img
					id="login-img"
					className="m-1"
					src="https://picsum.photos/200/300"
					alt="placeholder"
				></img>
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
