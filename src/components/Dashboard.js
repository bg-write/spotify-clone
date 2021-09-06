import { useState, useEffect } from 'react';
import useAuth from './useAuth';
import Player from './Player';
import TrackSearchResult from './TrackSearchResult';
import { Container, Form } from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';
import axios from 'axios';
import spotifyIconBlack from '../assets/Spotify_Icon_RGB_Black.png';

const CLIENT_ID = '5082ad4ebe774438b665e8d896ba35bd';
const spotifyApi = new SpotifyWebApi({
	clientId: CLIENT_ID,
});
const PORT = 'http://localhost:5000';

export default function Dashboard({ code }) {
	const accessToken = useAuth(code);
	const [search, setSearch] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [playingTrack, setPlayingTrack] = useState();
	const [lyrics, setLyrics] = useState('');

	function chooseTrack(track) {
		setPlayingTrack(track);
		setSearch('');
		setLyrics('');
	}

	useEffect(() => {
		if (!playingTrack) return;

		axios
			.get(`${PORT}/lyrics`, {
				params: {
					track: playingTrack.title,
					artist: playingTrack.artist,
				},
			})
			.then((res) => {
				setLyrics(res.data.lyrics);
			});
	}, [playingTrack]);

	useEffect(() => {
		if (!accessToken) return;
		spotifyApi.setAccessToken(accessToken);
	}, [accessToken]);

	useEffect(() => {
		if (!search) return setSearchResults([]);
		if (!accessToken) return;

		let cancel = false;
		spotifyApi.searchTracks(search).then((res) => {
			if (cancel) return;
			setSearchResults(
				res.body.tracks.items.map((track) => {
					const smallestAlbumImage = track.album.images.reduce(
						(smallest, image) => {
							if (image.height < smallest.height) return image;
							return smallest;
						},
						track.album.images[0]
					);

					return {
						artist: track.artists[0].name,
						title: track.name,
						uri: track.uri,
						albumUrl: smallestAlbumImage.url,
					};
				})
			);
		});

		return () => (cancel = true);
	}, [search, accessToken]);

	return (
		<>
			<Container id="dashboard-container" className="d-flex flex-column py-2">
				<div id="dashboard-header">
					<img
						id="dashboard-logo"
						className="m-3"
						alt="spotify logo"
						src={spotifyIconBlack}
						loading="lazy"
					/>
				</div>
				<Form.Control
					id="dashboard-form"
					type="search"
					placeholder="Search Songs & Artists"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<div id="dashboard-results" className="flex-grow-1 my-2">
					{searchResults.map((track) => (
						<TrackSearchResult
							track={track}
							key={track.uri}
							chooseTrack={chooseTrack}
						/>
					))}
					{searchResults.length === 0 && (
						<div id="dashboard-lyrics" className="text-center">
							{lyrics}
						</div>
					)}
				</div>
				<div id="dashboard-player">
					<Player accessToken={accessToken} trackUri={playingTrack?.uri} />
				</div>
			</Container>
		</>
	);
}
