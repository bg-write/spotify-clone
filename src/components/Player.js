import { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

export default function Player({ accessToken, trackUri }) {
	const [play, setPlay] = useState(false);

	useEffect(() => setPlay(true), [trackUri]);

	if (!accessToken) return null;
	// For further styling of the player: https://github.com/gilbarbara/react-spotify-web-playback/blob/HEAD/src/types/common.ts#L44
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
					name={"BG's Spotify Clone Web Player"}
					styles={{
						activeColor: 'fff',
						bgColor: '#333',
						color: '#fff',
						// height: number | string,
						loaderColor: '#fff',
						// loaderSize: number | string,
						sliderColor: '#1cb954',
						// 						sliderHandleBorderRadius: number | string,
						//   sliderHandleColor: string,
						//   sliderHeight: number,
						//   sliderTrackBorderRadius: number | string,
						//   sliderTrackColor: string,
						trackArtistColor: '#ccc',
						trackNameColor: '#fff',
					}}
				/>
			</div>
		</>
	);
}
