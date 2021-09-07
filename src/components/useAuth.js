import { useState, useEffect } from 'react';
import axios from 'axios';

const PORT = 'http://localhost:5000';

// Pass in the code that we got from our user (access token, refresh token, and the time our info expires).
export default function useAuth(code) {
	const [accessToken, setAccessToken] = useState();
	const [refreshToken, setRefreshToken] = useState();
	const [expiresIn, setExpiresIn] = useState();

	// Every time our code changes, make our API call to return our data.
	useEffect(() => {
		axios
			.post(`${PORT}/login`, { code })
			.then((res) => {
				setAccessToken(res.data.accessToken);
				setRefreshToken(res.data.refreshToken);
				setExpiresIn(res.data.expiresIn);
				window.history.pushState({}, null, '/');
			})
			.catch(() => {
				window.location = '/';
			})
			.catch((err) => {
				console.log('POST ERROR:', err);
			});
	}, [code]);

	useEffect(() => {
		if (!refreshToken || !expiresIn) return;
		const interval = setInterval(() => {
			axios
				.post(`${PORT}/refresh`, { refreshToken })
				.then((res) => {
					setAccessToken(res.data.accessToken);
					setExpiresIn(res.data.expiresIn);
				})
				.catch(() => {
					window.location = '/';
				});
		}, (expiresIn - 60) * 1000);

		return () => clearInterval(interval);
	}, [refreshToken, expiresIn]);

	return accessToken;
}
