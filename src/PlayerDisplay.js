import React from 'react';
import './PlayerDisplay.css';

const PlayerDisplay = (props) => {
	return (
		<div className="player-display-wrapper display-box">
			<span className="display-title">Player</span>
			<p>
				<span>HP:</span><span>{props.stats.hp}</span>
			</p>
			<p>
				<span>SP:</span><span>{props.stats.sp}</span>
			</p>
		</div>
	);
}

export default PlayerDisplay;