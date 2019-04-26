import React, { Component } from 'react';
import TILE_TEMPLATES from './TILE_TEMPLATES';
import Player from './Player';
import PlayerDisplay from './PlayerDisplay';
import Map from './Map';
import HUD from './HUD';
import Inventory from './Inventory';
import './App.css';

const arrowInputs = [
	{
		description: 'up',
		keyCode: 38
	},
	{
		description: 'down',
		keyCode: 40
	},
	{
		description: 'right',
		keyCode: 39
	},
	{
		description: 'left',
		keyCode: 37
	}
];

const interactionInputs = [
	{
		description: 'close',
		keyCode: 67
	}
]

class App extends Component {
	constructor() {
		super();
		//create room
		let initRoom = [[], [], [], []];
		const wrappedTile = (tile) => {
			let arr = [];
			arr.push(TILE_TEMPLATES[tile]);
			return arr;
		}
		for (let i = 0; i < 10; i++) {
			initRoom[0].push(wrappedTile('wall'));
		}
		initRoom[1].push(wrappedTile('wall'));
		for (let i = 1; i < 8; i++) {
			initRoom[1].push(wrappedTile('open'));
		}
		initRoom[1].push(wrappedTile('player'));
		initRoom[1].push(wrappedTile('door'));
		initRoom[2].push(wrappedTile('wall'));
		for (let i = 1; i < 9; i++) {
			initRoom[2].push(wrappedTile('open'));
		}
		initRoom[2].push(wrappedTile('wall'));
		for (let i = 0; i < 10; i++) {
			initRoom[3].push(wrappedTile('wall'));
		}
		//place player on random open space - TBD
		
		this.state = {
			turnCount: 0,
			playerStats: {
				hp: 10,
				sp: 0
			},
			inventory: [ //abstract inventory item templates (like TILE_TEMPLATES)
				{
					label: 'Wooden torch',
					type: 'light'
				}
			],
			displayLogs: [
				{
					turn: 0,
					message: 'You find yourself alone in a dark room.'
				}
			],
			mapState: initRoom
		};
		window.addEventListener('keydown', (e) => {
			const arrInput = arrowInputs.filter(i => i.keyCode === e.keyCode);
			if (arrInput.length > 0) this.handleInput(arrInput[0].description);
			else {
				const interactInput = interactionInputs.filter(i => i.keyCode === e.keyCode);
				if (interactInput.length > 0) this.handleInteraction(interactInput[0].description);
			}
		});
	}

	updateGameDisplay(update) { //logging turnCount is still not accurate 100%
		const updatedTurnCount = this.state.turnCount + 1;
		let logToAdd;
		if (update.engine === 'map') {
			let updatedMap = JSON.parse(JSON.stringify(this.state.mapState));
			if (update.hasOwnProperty('to')) {
				const currPos = this.getPlayerPos();
				updatedMap[currPos.y][currPos.x] = updatedMap[currPos.y][currPos.x]
					.filter(o => o.type !== 'player');
				if (updatedMap[currPos.y][currPos.x].length === 0) updatedMap[currPos.y][currPos.x] = updatedMap[currPos.y][currPos.x].concat(Object.assign({}, TILE_TEMPLATES.open));
				updatedMap[update.to.y][update.to.x] = updatedMap[update.to.y][update.to.x].concat(Object.assign({}, TILE_TEMPLATES.player));
			}
			if (update.hasOwnProperty('door')) {
				const updatedDoor = Object.assign({}, TILE_TEMPLATES.door, {status: update.doorUpdate});
				updatedMap[update.door.y][update.door.x] = updatedMap[update.door.y][update.door.x]
					.filter(o => o.type !== 'door')
					.concat(updatedDoor);
				logToAdd = {turn: updatedTurnCount, message: 'You open the door.'};
			}
			let updatedLogs = this.state.displayLogs;
			if (logToAdd !== undefined) updatedLogs = this.state.displayLogs.concat(logToAdd);
			this.setState({
				turnCount: updatedTurnCount,
				mapState: updatedMap,
				displayLogs: updatedLogs
			});
		}
	}

	getCell = (x, y) => {
		// console.log('getCell');
		return this.state.mapState[y][x]; //update to get cell list (instead of top object in cell list)
	}

	getPlayerPos() {
		// console.log('getPlayerPos');
		let x = 0, y = 0;
		this.state.mapState.forEach((row, rowIndex) => {
			row.forEach((cell, colIndex) => {
				// console.log('cell', cell.filter(o => o.type === 'player'));
				if (cell.filter(o => o.type === 'player').length > 0) {
					x = colIndex;
					y = rowIndex;
				}
			});
		});
		// console.log(`getPlayerPos - x: ${x}, y: ${y}`);
		return {x, y};
	}
	
	handleInput(direction) {
		// console.log('handleInput', direction);
		const xMod = direction === 'right' ? 1 : direction === 'left' ? -1 : 0;
		const yMod = direction === 'down' ? 1 : direction === 'up' ? -1 : 0;
		const currPos = this.getPlayerPos();
		const x = currPos.x + xMod;
		const y = currPos.y + yMod;
		this.handleMove(x, y);
	}
	
	handleInteraction(interaction) {
		// console.log('interact', interaction);
		if (interaction === 'close') {
			const door = this.getClosest('door');
			// console.log('door?', door);
			if (!door || !door.hasOwnProperty('x') || !door.x) return;
			else this.attemptDoorHandle(door.x, door.y, 'closed');
		}
	}
	
	getClosest(obj) {
		const currPos = this.getPlayerPos();
		const neighbors = [
			[currPos.x + 1, currPos.y], 
			[currPos.x - 1, currPos.y], 
			[currPos.x, currPos.y + 1], 
			[currPos.x, currPos.y - 1],	
			[currPos.x + 1, currPos.y + 1],
			[currPos.x + 1, currPos.y - 1],
			[currPos.x - 1, currPos.y + 1],
			[currPos.x - 1, currPos.y - 1]
		];
		let gotObj, x, y;
		neighbors.forEach(coords => {
			const gotCell = this.getCell(...coords);
			// console.log(`in getClosest - checking cell at coords ${coords}`, gotCell);
			gotCell.forEach(o => {
				if (o.type === obj) {
					gotObj = gotCell;
					x = coords[0];
					y = coords[1];
				}
			});
		});
		return {...gotObj, x, y}; //may update: may include reference to self coords in each tile object
	}

	handleMove(x, y) {
		// console.log('handleMove');
		const toCell = this.getCell(x, y);
		if (toCell.filter(o => o.type === 'open').length > 0) this.move({engine: 'map', to: {x, y}});
		if (toCell.filter(o => o.type === 'door').length > 0) this.attemptDoorHandle(x, y);
	}
	
	move(update) {
		// console.log('move');
		this.updateGameDisplay(update);
	}
	
	attemptDoorHandle(x, y, toStatus) {
		const door = this.getCell(x, y).filter(o => o.type === 'door')[0];
		if (!door || door.type !== 'door') return;
		if (door.status === 'open') {
			if (!toStatus) this.updateGameDisplay({engine: 'map', to: {x, y}});
			else this.updateGameDisplay({engine: 'map', doorUpdate: toStatus, door: {x, y}});
		}
		if (door.status === 'crushed') this.updateGameDisplay({engine: 'hud', message: 'Door\'s straight crushed, brah.'});
		if (door.status === 'closed') this.updateGameDisplay({
			engine: 'map',
			doorUpdate: 'open', 
			/*
			idea to extend door attempts (and other basic interactions):
			- get door difficulty level
			- get rand num based on static params (i.e. standard door difficulty baseline set in program)
			- modify rand num using player's stats
			- "roll" i.e. (modifiedRandNum, doorDifficulty) => modRndNum > doorDiff ? 'open' : 'closed'
			*/
			door: {x, y}
		});
	}

	render() {
		return (
			<div className="game-wrapper">
				<div className="display-wrapper">
					<PlayerDisplay stats={this.state.playerStats}/>
					<Map mapState={this.state.mapState}/>
				</div>
				<div className="display-wrapper">
					<HUD logs={this.state.displayLogs}/>
					<Inventory inv={this.state.inventory}/>
				</div>
			</div>
		);
	}
}

export default App;