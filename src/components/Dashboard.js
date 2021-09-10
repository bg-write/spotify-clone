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
// UPDATE PORT BASED ON DEPLOYMENT.
const PORT = 'http://localhost:5000';

// We pass in our authorized "code" from useAuth.
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

	// For whenever playingTrack updates and a song is currently playing, we want to return that song's lyrics.
	useEffect(() => {
		if (!playingTrack) return;
		console.log(playingTrack);
		axios
			.get(`${PORT}/lyrics`, {
				params: {
					track: playingTrack.title,
					artist: playingTrack.artist,
				},
			})
			.then((res) => {
				setLyrics(res.data.lyrics);
			})
			.catch((err) => {
				console.log('Lyrics ERROR', err);
			});
	}, [playingTrack]);

	// Whenever our accessToken changes, we need to update our spotifyApi object.
	useEffect(() => {
		if (!accessToken) return;
		spotifyApi.setAccessToken(accessToken);
	}, [accessToken]);

	// Whenever our search or accessToken changes, we need to update searchResults.
	useEffect(() => {
		if (!search) return setSearchResults([]);
		if (!accessToken) return;

		// Our Spotify search query!
		let cancel = false;
		spotifyApi
			.searchTracks(search)
			.then((res) => {
				if (cancel) return;
				setSearchResults(
					res.body.tracks.items.map((track) => {
						// Allows us to find our smallest img to return for each track.
						const smallestAlbumImage = track.album.images.reduce(
							(smallest, image) => {
								if (image.height < smallest.height) return image;
								return smallest;
							},
							track.album.images[0]
						);
						// For each track that we're mapping through in our search results ...
						return {
							artist: track.artists[0].name,
							title: track.name,
							uri: track.uri,
							albumUrl: smallestAlbumImage.url,
						};
					})
				);
			})
			.catch((err) => {
				console.log('Search ERROR:', err);
			});

		return () => (cancel = true);
	}, [search, accessToken]);

	return (
		<>
			<Container id="dashboard-container" className="d-flex flex-column py-2">
				<div
					id="dashboard-header"
					className="d-flex justify-content-between align-items-center"
				>
					<a href="/">
						<img
							id="dashboard-logo"
							className="m-3"
							alt="spotify logo"
							src={spotifyIconBlack}
							loading="lazy"
						/>
					</a>
					<div
						id="dashboard-song"
						className="d-flex flex-column align-items-center m-3"
					>
						{playingTrack && (
							<div id="dashboard-artist" className="fs-1">
								<div>{playingTrack.artist}</div>
							</div>
						)}
						{playingTrack && (
							<div id="dashboard-title" className="fs-5 text-center">
								<div>"{playingTrack.title}"</div>
							</div>
						)}
					</div>
					<div id="dashboard-image" className="d-flex align-items-center m-3">
						{playingTrack && (
							<div
								id="dashboard-artwork"
								className="p-2 img-fluid img-thumbnail rounded"
							>
								<img src={playingTrack.albumUrl} alt="song art" />
							</div>
						)}
					</div>
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
