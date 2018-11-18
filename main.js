// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

// parent constructor
function Shape(x, y, velX, velY, exists){
	this.x = x;
	this.y = y;
	this.velX = velX;
	this.velY = velY;
	this.exists = exists;

}

// ball constructor
function Ball(x, y, velX, velY, exists, color, size){
	Shape.call(this, x, y, velX, velY, exists);
	this.color = color;
	this.size = size;
}

Ball.prototype = Object.create(Shape.prototype);
Object.defineProperty(Ball.prototype, 'constructor', {
	value: Ball,
	emunerable: false,
	writable: true
});

Ball.prototype.draw = function(){
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
	ctx.fill();
};

Ball.prototype.update = function(){
	if((this.x + this.size) >= width){
		this.velX = -(this.velX);
	}
	if((this.x - this.size) <= 0){
		this.velX = -(this.velX);
	}
	if((this.y + this.size) >= height){
		this.velY = -(this.velY);
	}
	if((this.y - this.size) <= 0){
		this.velY = -(this.velY);
	}

	this.x += this.velX;
	this.y += this.velY;
};

Ball.prototype.collisionDetect = function(){
	for(var j = 0; j < balls.length; j++){
		if(!(this === balls[j])){
			var dx = this.x - balls[j].x;
			var dy = this.y - balls[j].y;
			var distance = Math.sqrt(dx * dx + dy * dy);

			if(distance < this.size + balls[j].size){
				balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
			}
		}
	}
}

// EvilCircle constructor
function EvilCircle(x, y, exists, color, size) {
	Shape.call(this, x, y, 20, 20, exists);
	this.color = 'white';
	size = 10;
}

EvilCircle.prototype = Object.create(Shape.prototype);
Object.defineProperty(EvilCircle.prototype, 'constructor', {
	value: EvilCircle,
	emunerable: false,
	writable: true
});

EvilCircle.prototype.draw = function(){
	ctx.beginPath();
	ctx.lineWidth = 3;
	ctx.strokeSyle = this.color;
	ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
	this.stroke();
}

EvilCircle.prototype.checkBounds = function(){
	if((this.x + this.size) >= width){
		this.x -= this.size;
	}
	if((this.x - this.size) <= 0){
		this.x -= this.size;
	}
	if((this.y + this.size) >= height){
		this.y -= this.size;
	}
	if((this.y - this.size) <= 0){
		this.y += this.size;
	}
}


var balls = [];

function loop() {
	ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
	ctx.fillRect(0, 0, width, height);

	while(balls.length < 25){
		var size = random(10, 20);
		var ball = new Ball(random(0 + size, width - size), random(0 + size, height - size), random(-7, 7), 
			random(-7, 7), true, 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')', size);
		balls.push(ball);
	}

	for(var i = 0; i < balls.length; i++){
		balls[i].draw();
		balls[i].update();
		balls[i].collisionDetect();
	};
	requestAnimationFrame(loop);
};

loop();