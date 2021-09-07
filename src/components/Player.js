import { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

// For further styling of SpotifyPlayer: https://www.npmjs.com/package/react-spotify-web-playback & https://github.com/gilbarbara/react-spotify-web-playback/blob/HEAD/src/types/common.ts#L44

export default function Player({ accessToken, trackUri }) {
	const [play, setPlay] = useState(false);

	// Every time we change our trackUri, we want to play it.
	useEffect(() => setPlay(true), [trackUri]);

	if (!accessToken) return null;
	return (
		<>
			<div id="player">
				<SpotifyPlayer
					token={accessToken}
					showSaveIcon
					callback={(state) => {
						if (!state.isPlaying) setPlay(false);
					}}
					play={play}
					uris={trackUri ? [trackUri] : []}
					magnifySliderOnHover
					name={"Spotify Clone Player"}
					styles={{
						// The track heart
						activeColor: '#1cb954',
						// The player
						bgColor: 'salmon',
						// Affects the rewind, pause/play, forward, speaker, and volume icons
						color: 'black',
						// The bar that shows where we're at in the track
						sliderColor: '#1cb954',
						// Artist font
						trackArtistColor: 'black',
						// Track font
						trackNameColor: 'black',
					}}
				/>
			</div>
		</>
	);
}
