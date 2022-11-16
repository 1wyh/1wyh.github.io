var canvas,ctx;

var days,hours,minutes,seconds;

var hearts = [];

var width;
var sw;
var marginTop,marginLeft;
var targ;
//相爱从99变到100，999天变到1000天会出问题，刷新一下就可以了，懒 得做处理了
// window.onload = app;

function app(t){
	init(t);
	gameloop();
}

function init(d){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	sw = window.innerWidth;
	w = document.getElementById("tc").offsetWidth;
	h = window.innerHeight;
	// var d = new Date();
	targ = d;
	timeCheck();

	canvas.width = w;
	canvas.height = 100;

	width = new Heart().size.width;

	addCheck();

	marginTop = 15;
	marginLeft = (w - (add+63)*width)/2;;
}
var add;
var addNum;
function addCheck() {
	// body...
	if(days>999)
		addNum = 4;
	else if(days>99)
		addNum = 3;
	else if(days>9)
		addNum = 2;
	else if(days>0)
		addNum = 1;
	else addNum = 1;
	//addNum++;
	add =(1+addNum)*9+2;

}

function timeCheck() {
	// body...
	var now = new Date();
	var secondsLeft = (now.getTime()-targ.getTime() ) / 1000;
	if (secondsLeft > 0) {
        days = parseInt(secondsLeft / 86400, 10);
        secondsLeft = secondsLeft % 86400;

        hours = parseInt(secondsLeft / 3600, 10);
        secondsLeft = secondsLeft % 3600;

        minutes = parseInt(secondsLeft / 60, 10);
        seconds = parseInt(secondsLeft % 60, 10);
    } else {
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
     
    }
}

function gameloop(){
	requestAnimationFrame(gameloop);
	render();
	update();
}

function Heart(scale){
	scale = scale || 0.14;
	if(w>700) scale = 0.16;
	else if(w>500) scale = 0.14;
	else {
		if(addNum==1) scale = 0.13;
		else if(addNum==2) scale = 0.12;
		else scale = 0.1;
	}
	this.point = [];
	this.size = {};
	this.centerPoint = {};
	this.init(scale);
}
Heart.prototype.init = function(scale){
	var xArr = [],yArr = [];
	for(var i=10;i<30;i+=0.2){
    	var t = i/Math.PI,
    		x = scale * 16 * Math.pow(Math.sin(t),3),
    		y = -scale * (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3 * t) - Math.cos(4*t));
    	this.point.push({x:x,y:y});
    	xArr.push(x);
    	yArr.push(y);
    }
    this.getCenter(xArr,yArr);
    this.getSize(xArr,yArr);
}
Heart.prototype.draw = function(translateX,translateY,color){
	this.translateX = translateX;
	this.translateY = translateY;
	ctx.save();
	ctx.fillStyle =  color || "#ef6a8a";
	ctx.translate(translateX,translateY);
	ctx.beginPath();
	for(var i=0,len=this.point.length;i<len;i++){
		var point = this.point[i];
		if(i===0){
			ctx.moveTo(point.x,point.y);
		}else{
			ctx.lineTo(point.x,point.y);
		}
	}
	ctx.closePath();
	ctx.fill();
	ctx.restore();
}
Heart.prototype.getCenter = function(xArr,yArr){
	this.centerPoint = {
		x : getMValue(Math.min.apply(null, xArr),Math.max.apply(null, xArr)),
		y : getMValue(Math.min.apply(null, yArr),Math.max.apply(null, yArr))
	};
}
Heart.prototype.getSize = function(xArr,yArr){
	this.size = {
		width : Math.abs(Math.min.apply(null, xArr) - Math.max.apply(null, xArr)),
		height : Math.abs(Math.min.apply(null, yArr) - Math.max.apply(null, yArr))
	};
}
function getMValue(min,max){
	return min + (max - min) / 2;
}
function renderDigit(x,y,num){
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]===1){
				var heart = new Heart();
				var translateX = Math.abs(heart.centerPoint.x - heart.size.width/2 - (x+j*heart.size.width)),
					translateY = Math.abs(heart.centerPoint.y - heart.size.height/2 - (y+i*heart.size.width));
				heart.draw(translateX,translateY);
			}
		}
	}
}
function update(){
	// var td = new Date(),
	// 	nexthours = td.getHours(),
	// 	nextminutes = td.getMinutes(),
	// 	nextseconds = td.getSeconds();
	var nexthours,nextminutes,nextseconds,nextdays;

	var now = new Date();
	var secondsLeft = (now.getTime()-targ.getTime() ) / 1000;
	if (secondsLeft > 0) {
        nextdays = parseInt(secondsLeft / 86400, 10);
        secondsLeft = secondsLeft % 86400;

        nexthours = parseInt(secondsLeft / 3600, 10);
        secondsLeft = secondsLeft % 3600;

        nextminutes = parseInt(secondsLeft / 60, 10);
        nextseconds = parseInt(secondsLeft % 60, 10);
    } else {
        nextdays = 0;
        nexthours = 0;
        nextminutes = 0;
        nextseconds = 0;
     
    }
	if(seconds != nextseconds){
		if(parseInt(nextdays%10) != parseInt(days%10)){
			addBalls(marginLeft + 9 * width*(addNum-1),marginTop,parseInt(hours%10));
		}
		if(parseInt(nexthours/10) != parseInt(hours/10)){
			addBalls(marginLeft +add * width,marginTop,parseInt(hours/10));
		}
		if(parseInt(nexthours%10) != parseInt(hours%10)){
			addBalls(marginLeft + (9+add) * width,marginTop,parseInt(hours%10));
		}
		if(parseInt(nextminutes/10) != parseInt(minutes/10)){
			addBalls(marginLeft + (23+add) * width,marginTop,parseInt(minutes/10));
		}
		if(parseInt(nextminutes%10) != parseInt(minutes%10)){
			addBalls(marginLeft + (32+add) * width,marginTop,parseInt(minutes%10));
		}
		if(parseInt(nextseconds/10) != parseInt(seconds/10)){
			addBalls(marginLeft + (46+add) * width,marginTop,parseInt(seconds/10));
		}
		if(parseInt(nextseconds%10) != parseInt(seconds%10)){
			addBalls(marginLeft + (55+add) * width,marginTop,parseInt(seconds%10));
		}
		seconds = nextseconds;
		hours = nexthours;
		minutes = nextminutes;
	}
	for(var i=0;i<hearts.length;i++){
		var heart = hearts[i];
		heart.tx += heart.vx;
		heart.ty += heart.vy;
		heart.vy += heart.g;
		if(heart.ty>=h){
			hearts.splice(i,1);
		}
	}
}
function addBalls(x,y,num){
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){	
			if(digit[num][i][j]===1){
				var heart = new Heart();
				var translateX = Math.abs(heart.centerPoint.x - heart.size.width/2 - (x+j*heart.size.width)),
					translateY = Math.abs(heart.centerPoint.y - heart.size.height/2 - (y+i*heart.size.width));
				hearts.push({
					heart : heart,
					tx : translateX,
					ty : translateY,
					vx : (Math.random()>0.5?1:-1) * 4,
					vy : -10,
					g : 1.5 + Math.random(),
					color : 'rgb(' + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + ","  + Math.floor(Math.random()*255) + ")"
				})
			}
		}
	}
}
function render(){
	ctx.clearRect(0,0,w,h);
	// renderDigit(marginLeft,marginTop,parseInt(hours/10));
	// renderDigit(marginLeft + 9 * width,marginTop,parseInt(hours%10));
	// renderDigit(marginLeft + 18 * width,marginTop,10);

	addCheck();
	if(addNum==1){
		renderDigit(marginLeft,marginTop,parseInt(days%10));
	}else if(addNum==2){
		renderDigit(marginLeft,marginTop,parseInt(days/10));
		renderDigit(marginLeft+ 9 * width,marginTop,parseInt(days%10));
	}else if(addNum==3){
		renderDigit(marginLeft,marginTop,parseInt(days/100));
		renderDigit(marginLeft+9 * width,marginTop,parseInt(days%10));
		renderDigit(marginLeft+ 9 * width*2,marginTop,parseInt(days%10));
	}else if(addNum==4){
		renderDigit(marginLeft,marginTop,parseInt(days/1000));
		renderDigit(marginLeft+9 * width,marginTop,parseInt(days%100));
		renderDigit(marginLeft+9 * width*2,marginTop,parseInt(days%10));
		renderDigit(marginLeft+ 9 * width*3,marginTop,parseInt(days%10));
	}

	renderDigit((0+add-10)*width+marginLeft,marginTop,parseInt(11));

	renderDigit((0+add)*width+marginLeft,marginTop,parseInt(hours/10));
	renderDigit(marginLeft+ (9+add) * width,marginTop,parseInt(hours%10));
	renderDigit(marginLeft + (18+add) * width,marginTop,10);

	renderDigit(marginLeft +(23+add) * width,marginTop,parseInt(minutes/10));
	renderDigit(marginLeft +(32+add) * width,marginTop,parseInt(minutes%10));
	renderDigit(marginLeft +(41+add) * width,marginTop,10);

	renderDigit(marginLeft +(46+add) * width,marginTop,parseInt(seconds/10));
	renderDigit(marginLeft +(55+add) * width,marginTop,parseInt(seconds%10));

	for(var i=0;i<hearts.length;i++){
		var heart = hearts[i];
		heart.heart.draw(heart.tx,heart.ty,heart.color);
	}
}