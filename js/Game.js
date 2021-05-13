class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    luffy = createSprite(100,200);
    luffy.addImage("player1",l_img);
    luffy.scale=0.3;
    gol = createSprite(300,200);
    gol.addImage("player2",g_img);
    gol.scale=0.4;
    cars=[luffy,gol]
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getCarSetEnd();
    
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));

    
      var gold = createSprite(100,displayHeight - 30);
     
      gold.addImage(gold_img)
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,100,100);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if (keyIsDown(UP_ARROW)&& player.index != null) {
    player.distance +=20;
    player.update();
    }
    
    if (keyIsDown(DOWN_ARROW)&& player.index != null) {
      player.distance -=20;
      player.update();
      }
      
    


    if(player.distance > 4000){
      gameState = 2;
      player.rank+=1
      Player.updateCarSetEnd(player.rank)
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}
