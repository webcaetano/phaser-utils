var params = require('./modules/urlParams');
var $utils = require('$utils');

module.exports = function(game,scope,rootScope){
	var craft = require('$craft')(game);

	_.each($utils.dotsBetween({x:0,y:100},{x:300,y:200},10),function(val,i){
		craft.$dot(3).$copyPos(val)
	})
}
