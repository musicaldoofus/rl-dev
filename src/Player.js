import React from 'react';

const Player = (props) => {
	//set color via gameState (hoisted)
	return (
		<div className={`player ${props.playerState}`}>
			
		</div>
	);
};

export default Player;