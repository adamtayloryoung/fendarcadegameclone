// Enemies our player must avoid
var Enemy = function(xPos, yPos, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.xPos = xPos;
    this.yPos = yPos;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/gel-cube.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.xPos += this.speed * dt;
    //recycle enemies that have moved off of canvas
    if(this.xPos > 550){
        this.xPos = -100;
        this.speed = 50 + Math.floor(Math.random() * 512);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.xPos, this.yPos);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.sprite = 'images/knight.png'
}


Player.prototype.restart = function(){
                    this.xPos = 200;
                    this.yPos = 400;
                    this.sprite = 'images/knight.png'

}

Player.prototype.update = function(){
        //check for collisions
        //did x and y collide with enemy
        if(this.yPos > 390){
            this.yPos = 390;
        };

        if(this.yPos < -28){
            this.yPos = -28;
        };

        if(this.xPos > 400){
            this.xPos = 400;
        };

        if(this.xPos < 0){
            this.xPos = 0;
        };
        //if you collect trophy, game resets!
        if(this.xPos === 200 && this.yPos === -28){
                console.log('You Win!!!')
                player.restart();
        }
     
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.xPos, this.yPos);
};

Player.prototype.handleInput = function(keyPress){
    switch(keyPress){
        case 'up':
            this.yPos -= 85;
            break;
        case 'left': 
            this.xPos -= 100;
            this.sprite = 'images/knight-flip.png';
            break;
        case 'right':
            this.xPos += 100;
            this.sprite = 'images/knight.png';
            break;
        case 'down':
            this.yPos += 85;
            break;     
    }

};


//trophy code that doesn't work for some reason
var Trophy = function(xPos, yPos){
    this.xPos = xPos;
    this.yPos = yPos;
    this.sprite = 'images/trophy.png';

};

Trophy.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.xPos, this.yPos);
}

var Rock = function (xPos, yPos){
    this.xPos = xPos;
    this.yPos = yPos;
    this.sprite = 'images/rock.png'
}

Rock.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.xPos, this.yPos);
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


var allEnemies = [];
var enemyPosition  = [90, 175, 260, 340];
var player = new Player(200, 390);
var trophy = new Trophy(200, -40);
var rock  = new Rock(200, 140);
// var enemy;

enemyPosition.forEach(function(yPos){
    enemy = new Enemy(0, yPos, 100 + Math.floor(Math.random() * 100));
    allEnemies.push(enemy);
});


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


//when not focused the game pauses - see engine.js:93
let paused = false;
window.onfocus = function () {
    paused = false;
}
window.onblur = function () {
    paused = true;
}

