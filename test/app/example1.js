var _ = require('lodash');
var Phaser = require('phaser');
var {scope,game} = require('./main');
var utils = require('utils');
var craft = require('craft')(game);

_.each($utils.dotsBetween({x:0,y:100},{x:300,y:200},10),function(val,i){
	craft.$dot(3).$copyPos(val)
})
