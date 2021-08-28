import React from 'react';
import { Container } from 'react-bootstrap';

const GET = 'https://accounts.spotify.com/authorize';
const CLIENT_ID = '5082ad4ebe774438b665e8d896ba35bd';
const RESPONSE_TYPE = 'code';
const REDIRECT_URI = 'http://localhost:3000';
const SCOPE =
	'streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';

const AUTH_URL = `${GET}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`;

export default function Login() {
	return (
		<>
			<Container
				className="d-flex justify-content-center align-items-center"
				style={{ minHeight: '100vh' }}
			>
				<a className="btn btn-success btn-lg" href={AUTH_URL}>
					Login with Spotify
				</a>
			</Container>
		</>
	);
}
