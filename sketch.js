var bg1, bg1img;
var howtoplay , howtoplayimg;
var instructions,instructionsimg;
var Continue , Continueimg;
var mainbg , mainbgimg;
var curtain1 ,curtain2 , curtainimg;
var obstacle , obstacle2 , obstacle3;
var obstacleimg , obstacle2img , obstacle3img;
var coin , coinimg;
var rip , ripimg;
var gameState = "START";
var ghostGroup;
var coinGroup;
var score = 0;

var rm,rmimg

function preload(){
 bg1img = loadImage("images/background1.png");
 howtoplayimg = loadImage("images/how to play.png");
 instructionsimg = loadImage("images/instructions.jpg");
 Continueimg = loadImage("images/continue.png");
 mainbgimg = loadImage("images/mainbg2.jpg");
 curtainimg = loadImage("images/curtain.png");

 obstacleimg = loadImage("images/obstacle.png");
 obstacle2img = loadImage("images/obstacle2.png");
 obstacle3img = loadImage("images/obstacle3.png");
 coinimg = loadImage("images/coinimage.png");

 ripimg = loadAnimation("images/ripimage.png");


 rmimg = loadAnimation("images/runningman1.png","images/runningman2.png","images/runningman3.png",
 "images/runningman4.png","images/runningman5.png",
 "images/runningman6.png","images/running man7.png","images/runningman8.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  howtoplay = createSprite(679,400,200,100)
  howtoplay.addImage(howtoplayimg);
  howtoplay.scale = 0.35;

  Continue = createSprite(879,550,200,100)
  Continue.addImage(Continueimg);
  Continue.scale = 0.35;

  mainbg = createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight);
  mainbg.addImage(mainbgimg);
  mainbg.scale = 2;

  curtain1 = createSprite(windowWidth/2,300)
  curtain1.addImage(curtainimg);
  curtain1.scale = 1.5;
  curtain1.velocityX = -25;


  curtain2 = createSprite(windowWidth/2,300)
  curtain2.addImage(curtainimg);
  curtain2.scale = 1.5;
  curtain2.velocityX = 25;

  rm = createSprite(200,450,5,5);
  rm.addAnimation("rmimg",rmimg);
  rm.addAnimation("rip",ripimg)
  rm.scale = 0.7;
  
 
  

  invisibleGround = createSprite(windowWidth/2 , 600 , windowWidth ,20);
  invisibleGround.visible = false;

  ghostGroup = new Group();
  coinGroup = new Group();

  
 
}

function draw() {
  
 

 
  if(gameState === "START"){

            background(bg1img);  
            Continue.visible = false;
           // text(mouseX + "," + mouseY , mouseX,mouseY);
           mainbg.visible = false;
           rm.visible = false;
          
            push();
            fill("red")
            textFont("chiller")
            textSize(90);
            textStyle(BOLD)
            text("Story",windowWidth/2-20,windowHeight/2 - 170);
          pop();
          
          
          fill("red")
          textFont("chiller")
          textSize(36);
          textStyle(BOLD);
          text("Welcome to the game 'Save Me !'. You are Alex trapped in a  " ,380,200)
          text(" haunted jungle. Try to escape from  the house💀." ,400,250);
          text("Press the 'how to play' button for instructions.", 420,300);
          
            
          if(mousePressedOver(howtoplay)){
          gameState = "PLAY";
          }
  }


  if(gameState==="PLAY"){
          background(instructionsimg);
        howtoplay.visible = false;
        Continue.visible = true;
        mainbg.visible = false;
        rm.visible = false;
        



        push();
        fill("Red");
        stroke("blue")
        textFont("chiller");
        textSize(60)
        textStyle(BOLDITALIC);
        text(" -: INSTRUCTIONS :- ", 380,50)
        

        textStyle(BOLD);
        text("Press the 'UP ARROW' key to jump. (⬆)", 150, 200);
        text("jump and touch the coins and check your highest score",150,300);
        text("BEST OF LUCK",800,500)
        
        pop();
    
        
         
        if(mousePressedOver(Continue)){
          gameState = "GAME";

        }

} 

 if(gameState === "GAME"){
              background(0);

              Continue.visible = false;
              mainbg.velocityX = -10;
              mainbg.visible = true;
              rm.visible = true;
              rm.collide(invisibleGround);

              if(mainbg.x<0){
                mainbg.x = windowWidth/2;
                
              }
             
              spawnGhost();
              spawnCoins();

              if(keyDown("UP_ARROW")){
                rm.velocityY = -15
                }
          rm.velocityY = rm.velocityY + 0.5;

          if(rm.isTouching(ghostGroup)){
            rm.changeAnimation("rip",ripimg)
            console.log("hello")
            mainbg.velocityX = 0
            ghostGroup.destroyEach();
            gameState = "END";
        }

        if(rm.isTouching(coinGroup)){
          score = score+1
          console.log(score)
          
        }
      
 }
 

drawSprites();
if(gameState === "END"){
  fill("Red")
  textFont("chiller")
  textStyle(BOLDITALIC)
  textSize(60);
  text("You are unable to escape",380,200)
  text("refresh the page and play again",380,300);
  
}
push();
stroke("blue")
strokeWeight(7)
textFont("algerian",)
fill("red")
textSize(35)
text("score:- " + score,1000,35)
pop();

}

function spawnGhost(){
    if(frameCount%150 === 0){

          var rand = Math.round(random(1,3));
          obstacle = createSprite(windowWidth,450);
          obstacle.velocityX = -10;
          if(rand ===1){
            obstacle.addImage(obstacleimg)
            obstacle.scale = 0.8
          }else if(rand ===2){
            obstacle.addImage(obstacle2img);
            obstacle.scale = 1
          }else{
            obstacle.addImage(obstacle3img)
            obstacle.scale = 2;
          }

        obstacle.lifetime = 600
        ghostGroup.add(obstacle);
       // obstacle.debug = true
        obstacle.setCollider("rectangle",0,100,90,obstacle.height);
      }
    
    
}

function spawnCoins(){
  if(frameCount%120 ===0){

    var rand = Math.round(random(50,150));
    coin = createSprite(windowWidth,rand);
    coin.addImage(coinimg);
    coin.velocityX = -10;
    coin.lifetime = 100;
    coin.scale = 0.3
    coinGroup.add(coin);
  }
  }
