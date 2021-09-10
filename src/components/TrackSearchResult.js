import React from 'react';
import styled from 'styled-components';

const StyledTrackSearchResult = styled.div`
	#track-search-result {
		cursor: pointer;
	}
	#track-album-img {
		height: 64px;
		width: 64px;
	}
`;

export default function TrackSearchResult({ track, chooseTrack }) {
	function handlePlay() {
		chooseTrack(track);
	}

	return (
		<>
			<StyledTrackSearchResult>
				<div
					id="track-search-result"
					className="d-flex m-2 align-items-center"
					onClick={handlePlay}
				>
					<img id="track-album-img" alt="cover" src={track.albumUrl} />
					<div className="ml-3">
						<div id="track-title">{track.title}</div>
						<div id="track-artist" className="text-muted">
							{track.artist}
						</div>
					</div>
				</div>
			</StyledTrackSearchResult>
		</>
	);
}
