import React from 'react';
import './Map.css';

//(consider creating a 'cell' component to print and keep <Map> stateful - might cut down on re-rendering)
//take a series of coordinates and instructions from <App>

const cellDimensions = {
	width: 14,
	height: 18
}

const Map = (props) => {
	const dimensions = {
		gridTemplateRows: `repeat(${props.mapState.length}, ${cellDimensions.height}px)`,
		gridTemplateColumns: `repeat(${props.mapState[0].length}, ${cellDimensions.width}px)`
	};
	const getClassNames = (cell) => {
		let classNames = [];
		classNames.push('cell');
		classNames.push(cell.type);
		if (cell.type === 'door') classNames.push(cell.status);
		return classNames.join(' ');
	};
	const rows = props.mapState
		.map(row => row
			.map(cell => {
				let cellFocus = cell[0];
				const playerObj = cell.filter(o => o.type === 'player');
				if (playerObj.length > 0) cellFocus = playerObj[0];
				return (
					<div className={getClassNames(cellFocus)}></div>
				);
			})
				
		);
	return (
		<div className="map-wrapper display-box">
			<span className="display-title">Map</span>
			<div className="map" style={dimensions}>
				{rows}
			</div>
		</div>
	);
};

export default Map;