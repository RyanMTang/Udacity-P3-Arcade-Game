// Enemies our player must avoid
var Enemy = function(x,y) {
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * 3 +1);// generates a random speed for the enemy
    this.sprite = 'images/enemy-bug.png';
};


// Checks enemies for collisions
Enemy.prototype.checkCollision = function() {
    if (player.x < this.x + 60 && player.x + 60 > this.x && player.y < this.y + 60 && 60 + player.y > this.y) {
        player.x =200;
        player.y =420;
        player.lives -= 1;
        var livesCount = document.getElementById('lives');
        livesCount.innerHTML = "Lives: " + player.lives;
        if (player.lives===0) {
            alert('Game Over');
            allEnemies = [];
        }

    }
};

//function to update the enemies location
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed;
    if (this.x > 450) {
        this.x = -50;
    }
    this.checkCollision();
};


// Constructor function for player
var Player = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
    this.score = 0;
    this.lives = 5;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Function for updating player location
Player.prototype.update = function() {
    if(this.x<0) {
        this.x=0;
    }
    if(this.x>400) {
        this.x=400;
    }
    if(this.y>420){
        this.y=420;
    }
    if(this.y<0){
        this.y=420;
        this.x=200;
        this.score += 1;
        var scoreCount = document.getElementById('score');
        scoreCount.innerHTML = "Score: " + player.score;
    }
};

// Renders the player on the canvas
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// How the player moves after certain keys are pressed
Player.prototype.handleInput = function(key){
    switch (key) {
        case 'left': 
            this.x = this.x - 100;
            break;
        case 'up':
            this.y = this.y - 100;
            break;
        case 'right':
            this.x = this.x + 100;
            break;
        case 'down':
            this.y = this.y + 100;
            break;
        }

};



var bug1 = new Enemy(0,50);// Instantiate enemies
var bug2 = new Enemy(-100,150);
var bug3 = new Enemy(0, 250);
var player = new Player(200,420); // Place the player object in a variable called player
var allEnemies = [bug1, bug2, bug3]; // Place all enemy objects in an array called allEnemies


// This listens for key presses and sends the keys to the Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

var restartButton = document.getElementById('restartButton');
// Restart button for restarting the game after player has lost all 5
restartButton.onclick = function () {
    var scoreCount = document.getElementById('score');
    var livesCount = document.getElementById('lives');
    player.lives = 5;
    player.score = 0;
    scoreCount.innerHTML = "Score: " + player.score;
    livesCount.innerHTML = "Lives: " + player.lives;
    allEnemies = [bug1, bug2, bug3];
};s



