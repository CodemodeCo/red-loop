let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let canvasProps = {
    height: canvas.clientHeight,
    width: canvas.clientWidth
}
let cursorProps = {
    _xPos : null,
    _yPos : null
}
canvas.addEventListener('mousemove', function(event){
    cursorProps._xPos = event.clientX;
    cursorProps._yPos = event.clientY;
})

let Ball = function(_color, _radius, _x, _y, _speedX, _speedY){
    this.color = _color;
    this.originalRadius = _radius;
    this.radius = _radius;
    this.x = _x;
    this.y = _y;
    this.speedX = _speedX;
    this.speedY = _speedY;

    this.update = function(_speedX, _speedY){
        if(this.x + this.radius >= canvasProps.width || this.x - this.radius <= 0){
            this.speedX = -this.speedX
        }
        if(this.y + this.radius >= canvasProps.height || this.y - this.radius <= 0){
            this.speedY = -this.speedY;
        }

        this.x = this.x + this.speedX;
        this.y = this.y + this.speedY;
        this.draw();
    }
    
    this.draw = function(){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
    }
}

//Random Color generator for balls;

let _randomColorGenerator = () => {
    return 'rgba(255,255,255,1)'
}

//Random Radius generator for balls;

let _randomRadiusGenerator = () =>{
    return 0.8;
}

//Generate random numbers in range

let _randomRangeGenerator = (_max) => {
    return Math.random() * (_max - 65) + 35;
}

// Get random speed for balls 0 = dx, 1 = dy

let _randomSpeedGenerator = (number) => {
    if(number == 0){
        return ((Math.random()*4) - 2.0)/10;
    }else if(number == 1){
        return ((Math.random()*4) - 2.0)/10;
    }else{
        console.log("Sorry, only values 1 and 0 accepted for x and y speeds");
    }
}


//Random X & Y co-ordinate generator 0 = x, 1 = y
let _randomCordinateGenerator = (number) => {
    if(number == 0){
        return _randomRangeGenerator(canvasProps.width)
    }else if(number == 1){
        return _randomRangeGenerator(canvasProps.height)
    }else{
        console.log("Sorry, only values 1 and 0 accepted for x and y co-ordinate");
    }
}

let BallArray = [];

for(let index = 0; index <125; index++){
    BallArray.push(new Ball(_randomColorGenerator(),
                            _randomRadiusGenerator(),
                            _randomCordinateGenerator(0),
                            _randomCordinateGenerator(1),
                            _randomSpeedGenerator(0),
                            _randomSpeedGenerator(1)
                        ));
}

//Function to draw all lines to connect each and every ball with mouse position

let animate = () => {
    requestAnimationFrame(animate);
    context.clearRect(0,0, canvas.clientWidth, canvas.clientHeight);

    for(var index = 0; index < BallArray.length; index++){
        BallArray[index].update();
    }

}
animate();