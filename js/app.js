// Enemies our player must avoid
var collision = 0, score = 0;
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.direction = 'right';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    x =  3*dt*100;
    switch(this.direction){
        case 'right':
            if(this.x < 470){
                this.x += x;
            }
            else{
                this.direction = 'left';
            }
            //collision... low probability that both x coordinates will collide at one point. created a range of values it can fall under.
            if(this.x >= player.x && this.x - x <= player.x){
                if(player.y >= this.y - 30 && player.y <= this.y + 30){
                    collision++;
                    player.x = 220;
                    player.y = 450;
                }
            }
            break;
        case 'left':
            if(this.x > 0){
                this.x -= x;
            }
            else{
                this.direction = 'right';
            }
            //collision
            if(this.x <= player.x && this.x + x >= player.x){
                if(player.y >= this.y - 30 && player.y <= this.y + 30){
                    collision++;
                    player.x = 220;
                    player.y = 410;
                }
            }
            break;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Players = function() {

    this.sprite = 'images/char-boy.png';
    this.x = 220;
    this.y = 410;
};

Players.prototype.handleInput = function(i) {
    this.pressed = i;
};

Players.prototype.update = function() {
    movement = 50;
    switch(this.pressed) {
        case 'left':
            if(this.x > 0){
                this.x -= movement;
                this.pressed = null;
            }
            break;
        case 'right':
            if(this.x < 470){
                this.x += movement;
                this.pressed = null;
            }
            break;
        case 'up':
            if(this.y > 0){
                this.y -= movement;
                this.pressed = null;;
            }
            break;
        case 'down':
            if(this.y < 410){
                this.y += movement;
                this.pressed = null;
            }
            break;
    }
    if(this.y <= 30){
        score++;
        this.x = 220;
        this.y = 410;
    }
    document.querySelector('#score').innerHTML = 'Score: ' + score;
};

Players.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var en1 = new Enemy(340,40);
allEnemies.push(en1);
var en2 = new Enemy(150,140);
allEnemies.push(en2);
var en3 = new Enemy(0,240);
allEnemies.push(en3);
var player = new Players();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
