var _ = require('lodash');
var Phaser = require('phaser');
var {scope,game} = require('./main');
var utils = require('utils');
var craft = require('craft')(game);

// _.each($utils.dotsBetween({x:0,y:100},{x:300,y:200},10),function(val,i){
// 	craft.$dot(3).$copyPos(val)
// })

// var amount = 30;
// _.times(amount,function(i){
// 	craft.$dot(5).$copyPos(utils.elipsePos({
// 		x:game.width*0.5,
// 		y:game.height*0.5
// 	},(360/amount)*i,{
// 		width:200,
// 		height:100,
// 	}));
// })

// console.log(utils.getPorInRange(150,300,225.00))


console.log(utils.mod(-11,10))
