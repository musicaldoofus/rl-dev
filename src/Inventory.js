import React from 'react';

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const Inventory = (props) => {
	const inventory = props.inv.map((item, i) => (
		<p key={i} className={`inventory-item ${item.type}`}>
			<span>{alphabet[i]}</span>
			<span>{item.label}</span>
		</p>
	));
	return (
		<div className="inventory-wrapper display-box">
			<span className="display-title">Inventory</span>
			<div className="inventory">
				{inventory}
			</div>
		</div>
	);
}

export default Inventory;