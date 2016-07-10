var Phaser = require('phaser');
var main = require('./main');
require('./scope'); // !this is not pointless

var setup = {
	width:500,
	height:400,
	where:'master-canvas',
	debug:false, // make sure set it to false when release
}

require('./modules/stats')();

var game = main.game = new Phaser.Game(
	setup.width,
	setup.height,
	Phaser.CANVAS,
	setup.where,
	setup.where,
);

game.state.add('game', require('./game'));
game.state.start('game');
