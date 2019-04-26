const ITEM_TEMPLATES = {
	potion: {
		type: 'potion'
	}
};

//add:
//- reference to tile's coordinates (i.e. coords: {x, y})
const TILE_TEMPLATES = {
	open: {
		type: 'open',
		isVisible: true,
		isKnown: true
	},
	player: {
		type: 'player'
	},
	wall: {
		type: 'wall',
		isVisible: true,
		isKnown: true
	},
	door: {
		type: 'door',
		status: 'closed', //['closed', 'open', 'locked', 'crushed']
		isVisible: true,
		isKnown: true
	},
	item: {
		type: 'item',
		item: ITEM_TEMPLATES.potion
	}
};

export default TILE_TEMPLATES;