var background, backgroundImg, road, roadImg, dog, dogRunning, boy, boyRunning, barrier, barrierImg, coin, coinImg;
var invisibleGround;
var boyY = 0;
var PLAY = 1;
var END = 0;

var gameState = PLAY;

function preload() {
  backgroundImg = loadImage("scenery.jpg");
  roadImg = loadImage("road333.png");
  boyRunning = loadAnimation("boy_running1.png", "boy_running2.png", "boy_running3.png")
  dogRunning = loadAnimation("dog_running1.png", "dog_running2.png");
  barrierImg = loadImage("barrier.png");
  coinImg = loadImage("coin.png");
}

function setup() {
  createCanvas(1000, 700);


  background = createSprite(690, 230);
  background.addImage("background", backgroundImg)
  background.scale = 3;
  

  road = createSprite(600, 600)
  road.addImage("road", roadImg);
  road.velocityX = -2;

  boy = createSprite(350, 460, 10, 10)
  boy.addAnimation("boy", boyRunning);
  boy.scale = 0.5;
  boy.setCollider("rectangle",0,0,boy.width,boy.height);

  dog = createSprite(90, 500, 10, 10);
  dog.addAnimation("dog", dogRunning);
  dog.scale = 0.4;

  invisibleGround = createSprite(200, 560, 2000, 10);
  invisibleGround.visible = false;

  obstaclesGroup = new Group();
  coinsGroup = new Group();
  
  text(boyY,500,50);

}

function draw() {
  //background(0);
  //text("Score: "+ score, 500,50);
  console.log(boy.y);

  boy.velocityY = boy.velocityY + 0.8;
  
  boy.collide(invisibleGround);

  if (obstaclesGroup.isTouching(boy)) {
    
    gameState = END;
  }

  if (gameState === PLAY) {
    if (road.x < 400) {
      road.x = 600
    }

    if (coinsGroup.isTouching(boy)) {
      coinsGroup.destroyEach();
    }

    if (keyDown("space") && boy.y > 300 && boy.velocityY <5 ) {
      boy.velocityY = -10;
      boy.y = boy.y - 40;
    }
    else {
      boy.velocityY = 5;
    }

    
  }


  else  {
    road.velocityX = 0;
    boy.velocityY = 0;

    obstaclesGroup.setLifetimeEach(-1);
    coinssGroup.setLifetimeEach(-1);

    obstaclesGroup.setVelocityXEach(0);
    coinsGroup.setVelocityXEach(0);
  }

  

  drawSprites();
  spawnObstacles();
  spawnCoins();
  
}


function spawnObstacles() {
  if (frameCount % 240 === 0) {
    var barrier = createSprite(Math.round(random(500, 1000)), 550);
    barrier.addImage(barrierImg);
    barrier.scale = 0.5;
    barrier.lifetime = 1000;
    barrier.velocityX = -6;
    barrier.setCollider("rectangle",0,0,150,200);
    obstaclesGroup.add(barrier);
    
  }

}

function spawnCoins() {
  if (frameCount % 240 === 0) {
    var coin = createSprite(Math.round(random(500, 1000)), 350);
    coin.addImage(coinImg);
    coin.scale = 0.04;
    coin.lifetime = 1000;
    coin.velocityX = -2;
    coinsGroup.add(coin);
  }
}

function enableDebugger(){
  boy.debug = true;
  obstaclesGroup.debug = true;
  coinsGroup.debug = true;
  dog.debug = true;
}