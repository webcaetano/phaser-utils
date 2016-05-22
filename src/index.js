if(!Phaser) var Phaser = require('phaser');
if(!_) var _ = require('lodash');

var self = {}

self.noop = function(){};

self.ang = {
	to:{
		rad:function(a){
			return a*(180/Math.PI)
		},
		deg:function(a){
			return a*(Math.PI/180);
		}
	}
}

self.randInRange = function(range){
	var a = self.rand(0,360) * (Math.PI / 180);
	var d = self.rand(0,range*0.5);
	return {
		x:Math.cos(a) * d,
		y:Math.sin(a) * d
	}
}

self.getCenter = function(obj){
	return {
		x:obj.x+(obj.width*0.5),
		y:obj.y+(obj.height*0.5),
	}
}

self.time = function(){
	return Math.floor(+new Date()/1000);
}

self.porBetween = function(min,max,curent,por,fixed){
	if(por===undefined) por = 100;
	if(fixed===undefined) fixed = 2;

	return Number(((curent-min)*por/(max-min)).toFixed(fixed))
}

self.hitDotBox = function(dot,box){
	return dot.x>box.x &&
	dot.x<box.x+box.width &&
	dot.y>box.y &&
	dot.y<box.y+box.height;
}

self.hitBoxBox = function(box1,box2){
	return box1.x+box1.width>box2.x &&
	box1.x<box2.x+box2.width &&
	box1.y+box1.height>box2.y &&
	box1.y<box2.y+box2.height;
}

self.dotsBetween = function(point1,point2,amount){
	if(amount===undefined) amount = 1;

	var resp = [];
	var dist = self.dist(point1,point2);
	var a = self.angleBetween(point1,point2);
	return _.map(new Array(amount),function(val,i){
		var currentPos = (dist/(amount+1))*(i+1);
		return {
			x:point1.x + Math.cos(a)*currentPos,
			y:point1.y + Math.sin(a)*currentPos
		}
	});
}

self.dotLine = function(point1,point2,amount){
	return [point1].concat(self.dotsBetween(point1,point2,amount-2)).concat([point2]);
}

self.angleBetween = function(point1,point2){
	return Math.atan2(point2.y-point1.y, point2.x-point1.x);
}

self.angleBetweenRad = function(point1,point2){
	return Math.atan2(point2.y-point1.y, point2.x-point1.x)*(180/Math.PI);
}

self.pointBetweenPorcent = function(point1,point2,por){
	return $utils.radPos(
		point1,
		$utils.angleBetweenRad(point1,point2),
		$utils.dist(point1,point2)*por
	);
}

self.randomPointBetween = function(point1,point2){
	return self.pointBetweenPorcent(point1,point2,_.random(0,100)/100);
}

self.radPos = function(point,angle,range){
	var a = angle * (Math.PI / 180);
	return {
		x:point.x + (Math.cos(a) * range),
		y:point.y + (Math.sin(a) * range)
	}
}

self.getRangeIndexByValue = function(length,current,modes,ASC){
	if(ASC===undefined) ASC=true;

	if(current>=length) current=length-1;
	if(current<=0) current=0;

	return ~~(modes*(current/length));
}

self.getModeByValue = function(length,current,modes,ASC){
	if(ASC===undefined) ASC=true;
	return modes[self.getRangeIndexByValue(length,current,modes.length,ASC)];
}

self.randPorRange = function(val,por){
	var part = Math.ceil(val*por/100);
	return self.rand(val-part,val+part);
}

self.toHHMMSS = function ($) {
	var sec_num = parseInt($, 10);
	var hours   = Math.floor(sec_num / 3600);
	var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	var seconds = sec_num - (hours * 3600) - (minutes * 60);

	if (hours<10) hours="0"+hours;
	if (minutes<10) minutes="0"+minutes;
	if (seconds<10) seconds="0"+seconds;
	return hours+':'+minutes+':'+seconds;
}

self.renameAttr = function(obj,name,replace){
	obj[replace] = obj[name];
	delete obj[name];
	return obj;
}

self.loadAssets = function(game,assets){
	var i;
	for(i in assets.atlas) {
		game.load.atlasJSONHash(i, assets.atlas[i].image, self.ifTrue(assets.atlas[i].jsonUrl), self.ifTrue(assets.atlas[i].json));
	}
	for(i in assets.images) game.load.image(i, assets.images[i]);
	for(i in assets.sprites) game.load.spritesheet(i, assets.sprites[i].image, assets.sprites[i].width, assets.sprites[i].height, assets.sprites[i].frames);
	for(i in assets.audio) game.load.audio(i, assets.audio[i]);
}

self.por = function(val,por,plus,fix){
	if(plus===undefined) plus=true;
	if(fix===undefined) fix=0;

	return Number(((val * por / 100)*(plus ? 1 : -1)+val).toFixed(fix));
}

self.dist = function(obj1,obj2){
	return Math.sqrt(Math.pow(obj1.x-obj2.x,2)+Math.pow(obj1.y-obj2.y,2));
}

self.setBtn = function(obj,callback){
	if(callback===undefined) callback=null;
	if(!obj) return;
	if(!obj.inputEnabled) obj.inputEnabled = true;
	if(!obj.input) return;
	obj.input.useHandCursor = true;
	if(callback){
		obj.events.onInputUp.add(function(e){
			callback.apply(this,[e]);
		});
	}
	return obj;
}

self.setBtnHold = function(obj,callback,callback2){
	if(callback===undefined) callback=null;
	if(!obj) return;
	if(!obj.inputEnabled) obj.inputEnabled = true;
	if(!obj.input) return;
	obj.input.useHandCursor = true;
	if(callback){
		obj.events.onInputDown.add(function(e){
			callback.apply(this,[e]);
		});
	}
	if(callback2){
		obj.events.onInputUp.add(function(e){
			callback2.apply(this,[e]);
		});
	}
	return obj;
}

self.setHover = function(obj,callback,callback2){
	if(callback===undefined) callback=null;
	if(callback2===undefined) callback2=null;

	if(!obj) return;
	if(!obj.inputEnabled) obj.inputEnabled = true;
	if(!obj.input) return;
	obj.input.useHandCursor = true;
	if(callback){
		obj.events.onInputOver.add(function(e){
			callback.apply(this,[e]);
		});
	}
	if(callback2){
		obj.events.onInputOut.add(function(e){
			callback2.apply(this,[e]);
		});
	}
	return obj;
}

module.exports = self;
