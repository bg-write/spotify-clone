import { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

export default function Player({ accessToken, trackUri }) {
	const [play, setPlay] = useState(false);

	useEffect(() => setPlay(true), [trackUri]);

	if (!accessToken) return null;
	// For further styling of the player: https://www.npmjs.com/package/react-spotify-web-playback & https://github.com/gilbarbara/react-spotify-web-playback/blob/HEAD/src/types/common.ts#L44
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
