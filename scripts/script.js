const myGameArea = {
    canvas: document.createElement('canvas'),
  frames: 0,
  points : 0,
    start: function () {
      this.canvas.width = 480;
      this.canvas.height = 270;
      this.context = this.canvas.getContext('2d');
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    
    this.interval = setInterval(updateGameArea, 20);
    
      },

      clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
      
    stop: function () {
        clearInterval(this.interval);
      },

    drawScore: function () {                
        this.context.font = '18px serif';
        this.context.fillStyle = 'black';
        this.context.fillText(`Score: ${this.points}`, 350, 50);
      },

};

  class Component {
    constructor(width, height, color, x, y, imgSource = null) {
      this.width = width;
      this.height = height;
      this.color = color;
      this.x = x;
      this.y = y;
      this.speedX = 0;
      this.speedY = 0;
      if (!imgSource){
        this.image = null
      } else {
        this.image = new Image()
      this.image.src = imgSource
      }
      
     
    
      
}
newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x <= 0 ){
        this.x = 0;
    } else if (this.x >= 450){
        this.x = 450;
    }
    
    if (this.y <= 0){
        this.y = 0;
    } else if (this.y >= 240){
        this.y = 240;
    }

}
   
    update() {
      const ctx = myGameArea.context;
      if (!this.image){
        ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      } else {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
      }
      
    }

    left() {
        return this.x;
      }
      right() {
        return this.x + this.width;
      }
      top() {
        return this.y;
      }
      bottom() {
        return this.y + this.height;
      }

      newPosition(){

      }
     
      crashWith(obstacle) {
        return !(this.bottom() < obstacle.top() || this.top() > obstacle.bottom() || this.right() < obstacle.left() || this.left() > obstacle.right());
      }

    
      
  }

  const player = new Component(30, 30, 'red', 240, 235, './Images/chicken-sprite.png');


  document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
      case 38: // up arrow
        player.speedY -= 2;
        break;
      case 40: // down arrow
        player.speedY += 2;
        break;
      case 37: // left arrow
        player.speedX -= 2;
        break;
      case 39: // right arrow
        player.speedX += 2;
        break;
    }
  });

  document.addEventListener('keyup', (e) => {
    player.speedX = 0;
    player.speedY = 0;
  });

  let randomW = Math.floor(Math.random() * (myGameArea.canvas.width - 10));

  let randomH = Math.floor(Math.random() * (myGameArea.canvas.height - 10));


  let goldenCoins = new Component(10, 10, 'yellow', randomW, randomH);

  const myRObstacles = [];

  const myRObstacles2 = [];

  const myLObstacles = [];

  const myLObstacles2 = [];





  function updateObstacles() {
    for (i = 0; i < myRObstacles.length && i < myRObstacles2.length; i++) {
        
        myRObstacles[i].x += -1;
        myRObstacles[i].update();

        myRObstacles2[i].x += -1;
        myRObstacles2[i].update();

        myLObstacles[i].x += 1;
        myLObstacles[i].update();

        myLObstacles2[i].x += 1;
        myLObstacles2[i].update();
        
      }
    myGameArea.frames += 1;
    if (myGameArea.frames % 120 === 0) {
      let x = myGameArea.canvas.width;
      let minHeight = 20;
      let maxHeight = 200;
      let height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
      let minGap = 50;
      let maxGap = 200;
      let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);

      let topRObstacle = new Component(40, 20, 'blue', x, 500)
      let bottomRObstacle = new Component(40, 20, 'blue', x, height + ( 2 * gap))
      let topLObstacle = new Component(40, 20, 'blue', 0, 100)
      let bottomLObstacle = new Component(40, 20, 'blue', 0, height + gap)
      myRObstacles.push(topRObstacle);
      myRObstacles2.push(bottomRObstacle);

      myLObstacles.push(topLObstacle);
      myLObstacles2.push(bottomLObstacle);


      
    }
  }


  function checkCollection() { 
    let collecteds =  player.crashWith(goldenCoins);
    if (collecteds) {
        myGameArea.points += 100;
        let randomW = Math.floor(Math.random() * (myGameArea.canvas.width - 10));
        let randomH = Math.floor(Math.random() * (myGameArea.canvas.height - 10));
        goldenCoins.x = randomW;
        goldenCoins.y = randomH;

      }
    
   
    
}

  

  function checkGameOver() {
    const crashed = myRObstacles.some(function (obstacle) {
      return player.crashWith(obstacle);
    });
   
    if (crashed) {
      myGameArea.stop();
    }

    const crashed2 = myRObstacles2.some(function (obstacle) {
        return player.crashWith(obstacle);
      });
     
      if (crashed2) {
        myGameArea.stop();
      }

      const crashed3 = myLObstacles.some(function (obstacle) {
        return player.crashWith(obstacle);
      });
     
      if (crashed3) {
        myGameArea.stop();
      }
  
      const crashed4 = myLObstacles2.some(function (obstacle) {
          return player.crashWith(obstacle);
        });
       
        if (crashed4) {
          myGameArea.stop();
        }

  }


  function updateGameArea() {
    myGameArea.clear();
    player.newPos();
    player.update();
    updateObstacles();
    checkGameOver();
    goldenCoins.update();
    checkCollection()
    myGameArea.drawScore();
    
  }

  myGameArea.start();