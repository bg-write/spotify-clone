import { useState, useEffect } from 'react';
import axios from 'axios';

const PORT = 'http://localhost:5000';

// Pass in the code that we got from our user (access token, refresh token, and the time our info expires).
export default function useAuth(code) {
	const [accessToken, setAccessToken] = useState();
	const [refreshToken, setRefreshToken] = useState();
	const [expiresIn, setExpiresIn] = useState();

	// Every time our code changes, make our API call and set our data to our new info, and then we remove that info from our URL. If we get any errors, we redirect our users back to our Login root page.
	useEffect(() => {
		axios
			.post(`${PORT}/login`, { code })
			.then((res) => {
				setAccessToken(res.data.accessToken);
				setRefreshToken(res.data.refreshToken);
				setExpiresIn(res.data.expiresIn);
				window.history.pushState({}, null, '/');
			})
			.catch((err) => {
				console.log('API call ERROR:', err);
				window.location = '/';
			});
	}, [code]);

	// Enable our refresh token to automatically reload each hour (a minute before the refresh hour), so that our users don't get kicked off our app if they're on it for more than an hour at a time. Whenever our refreshToken or expiresIn changes, set off this useEffect.
	useEffect(() => {
		if (!refreshToken || !expiresIn) return;
		const interval = setInterval(() => {
			axios
				.post(`${PORT}/refresh`, { refreshToken })
				.then((res) => {
					setAccessToken(res.data.accessToken);
					setExpiresIn(res.data.expiresIn);
				})
				.catch((err) => {
					console.log('Refresh ERROR:', err);
					window.location = '/';
				});
		}, (expiresIn - 60) * 1000);

		return () => clearInterval(interval);
	}, [refreshToken, expiresIn]);

	// This  accessToken allows us to do everything with Spotify's API!
	return accessToken;
}
