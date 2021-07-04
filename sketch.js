var trex,trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud,cloudImage,cloudGroup;
var obsatcle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var obstacle,obstacleGroup;
var play;
var gameState = "play";
var restartImg, restart,gameOver,gameOverImg;
var score = 0;

function preload(){
 trex_running =
 loadAnimation("trex1.png","trex3.png","trex4.png");
  
  trex_collided = loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png"); 
  cloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");
}
function setup() {
  createCanvas(600,300);
  
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("runningCollided", trex_collided);
  trex.scale = 0.5;
  trex.x = 50;
  
  gameOver = createSprite(300,100,50,50);
  gameOver.addImage("gameover",gameOverImg)
  gameOver.scale = 0.7;
  
  ground = createSprite(300,280,600,90); 
  ground.addImage("ground",groundImage);
  ground.x = ground.width/2;
  
  invisibleGround = createSprite(200,290,400,10);
  invisibleGround.visible = false;

 restart = createSprite(300,150,10,10);
restart.addImage("restart",restartImg);
restart.scale = 0.7;  
  edges = createEdgeSprites();
  
  
  obstacleGroup = createGroup();
  cloudGroup = createGroup();
}
function draw(){
  background("white");
  text("Score:  "+ score,  500,50);

  
  if(gameState === "play"){
  restart.visible = false;
  gameOver.visible = false;
  score = score +    Math.round(getFrameRate()/60) ;
  ground.velocityX = -(6+2*score/70);
  //ground.velocityX = -2;
  
  if (ground.x<0){
    ground.x = ground.width /2;
  }  
  
  if (keyDown("space") && trex.y >= 250){
    trex.velocityY = -15;
  }
  
  trex.velocityY = trex.velocityY +0.9;

  
  //console.log("frame",frameCount);
 // frameRate();
  
  spawnClouds();
  spawnObstacle();
    
if (obstacleGroup.isTouching(trex)){
 
 textSize(23);
 gameState = "end";
   
}
 
    
  }
  else{
    restart.visible = true;
    gameOver.visible = true;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    ground.velocityX = 0;
    trex.velocityY = 0;              trex.changeAnimation("runningCollided",trex_collided);
    
     obstacleGroup.setLifetimeEach(-1);
     cloudGroup.setLifetimeEach(-1);

  if(mousePressedOver(restart)) {
    reset();
  }
  }
  
  trex.collide(invisibleGround);
  drawSprites();


}
function spawnClouds(){
  
  if (frameCount %60 === 0) {//60,120,180....
    
  cloud = createSprite(600,100,40,10);
  var rand = Math.round(random(80,150)) 
  cloud.addImage(cloudImage)
  cloud.scale = 0.4;
  cloud.y = rand;
  cloud.velocityX = -3;
  cloud.lifetime = 200 ;  //speed = distance / time 
  
  cloud.depth = trex.depth;
  trex.depth = trex.depth +1;
  cloudGroup.add(cloud);

  }

  
}
function spawnObstacle(){
 
 if (frameCount %120 === 0) {
   obstacle = createSprite(600,265,10,40);
   obstacle.velocityX = -(3+ 3*score/100);
  
 var randomO = Math.round(random(1,6));
  switch(randomO){
    case 1:  obstacle.addImage(obstacle1);
     break;
    case 2:  obstacle.addImage(obstacle2);
     break;
    case 3:  obstacle.addImage(obstacle3);
      break;
    case 4:  obstacle.addImage(obstacle4);
      break;
    case 5:  obstacle.addImage(obstacle5);
      break;
    case 6:  obstacle.addImage(obstacle6);
      break;
    
      default: break;
  
  }
   obstacle.scale = 0.5;
   obstacle.lifetime = 300;
   obstacleGroup.add(obstacle);
 }

}
function reset(){
  gameState = "play";
  gameOver.visible = false;
  restart.visible = false;
  trex.changeAnimation("running",trex_running);
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  score = 0;
}