var _ = require('lodash');
var Phaser = require('phaser');
var {scope,game} = require('./main');
var utils = require('utils');
var craft = require('craft')(game);


var objs = [
	{x:150,y:200,angle:-45},
	{x:350,y:200,angle:225},
];
_.each(objs,function(val){
	craft.$dot(5).$set({
		x:val.x,
		y:val.y
	});

	console.log(val.angle)
	craft.$dot(5).$copyPos(utils.radPos(val,val.angle,50))
})

var inter = utils.pointAngleIntersection(objs[0],objs[0].angle,objs[1],objs[1].angle)
if(inter){
	craft.$dot(5,'#28C522').$copyPos(inter);
}
