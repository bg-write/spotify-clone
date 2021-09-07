import React from 'react';
import { Container } from 'react-bootstrap';
import spotifyIconBlack from '../assets/Spotify_Icon_RGB_Black.png';
import styled from 'styled-components';

// For a full list of Spotify data query parameters and values for our authorization URI ("Construct the authorization URI"): https://developer.spotify.com/documentation/general/guides/authorization-guide/

// Make sure REDIRECT_URI matches what's on your Developer Dashboard ("Dashboard" -> "Edit Settings" -> "Redirect URIs") and env: https://developer.spotify.com/. http://localhost:3000 or https://git.heroku.com/bg-spotify-clone-with-lyrics.git.

const GET = 'https://accounts.spotify.com/authorize';
const CLIENT_ID = '5082ad4ebe774438b665e8d896ba35bd';
const RESPONSE_TYPE = 'code';
const REDIRECT_URI = 'http://localhost:3000';
const SCOPE =
	'streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';

const AUTH_URL = `${GET}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`;

const StyledLogin = styled.div`
	#login-container {
		background-color: salmon;
		min-height: 100vh;
	}
	#login-logo {
		width: 8rem;
		height: 8rem;
		border-radius: 50%;
		animation: spin 4s linear infinite;
	}
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	#login-logo:hover {
		background-color: var(--spotify-green);
	}
	#login-button {
		color: var(--spotify-white);
		background-color: var(--spotify-black);
	}
	#login-button:hover {
		background-color: var(--spotify-green);
	}
`;

export default function Login() {
	return (
		<>
			<StyledLogin>
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
					<a id="login-button" className="btn btn-lg m-1" href={AUTH_URL}>
						Login with Spotify
					</a>
				</Container>
			</StyledLogin>
		</>
	);
}
