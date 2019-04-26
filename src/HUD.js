import React from 'react';
import './HUD.css';

const HUD = (props) => {
	const beginIndex = props.logs.length > 10 ? props.logs.length - 10 : 0;
	const endIndex = props.logs.length > 10 ? props.logs.length - 1 : undefined;
	const logs = props.logs
		.slice(beginIndex, endIndex)
		.map((log, i) => (
			<p key={i} className="heads-up-display-log">
				<span>{log.turn}</span>
				<span>{log.message}</span>
			</p>
		));
	const prevLogIndicator = props.logs.length > 10 ? '...' : null;
	return (
		<div className="heads-up-display display-box">
			<span className="display-title">Logs</span>
			{prevLogIndicator}
			{logs}
		</div>
	);
}

export default HUD;