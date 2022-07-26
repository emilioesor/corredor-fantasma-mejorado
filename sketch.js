// dar de alta las variables 
 var calaca, calaca_texture, calaca_muerta;
 var torre, torre_texture;
 var puerta, puerta_texture;
 var barandilla, barandilla_texture;
 var reiniciar, reiniciar_texture;
 var end;
 var click, click_texture;

// elementos : fondo de la torre, puerta, fantasma, climber

 var invisibleBlockGroup, invisibleBlock;
 var gameState = "play";


 function preload(){
  // cargar imagenes y sonido
  torre_texture = loadImage ("tower.png");
  puerta_texture = loadImage("door.png");
  barandilla_texture = loadImage ("climber.png");
  calaca_texture = loadImage ("ghost-standing.png");
  reiniciar_texture = loadImage ("reinicio.png");
  click_texture = loadImage ("click.png");
  calaca_muerta = loadImage ("ghost-jumping.png");

}

function setup() {
  createCanvas(600,600);
  //spookySound.loop(); //REPRODUCCIÓN EN BUCLE
   
  //crear torre 
   torre = createSprite (300,300);
   torre.addImage (" t", torre_texture);
    
  // crear fantasma 
   calaca = createSprite (200,200,50,50);
   calaca.addImage("c", calaca_texture);
   calaca.scale = 0.4;

  
   // GRUPO DE PUERTAS
     puertasG = new Group();
   // GRUPO DE CLIMBERS 
     invisibleBlockGroup = new Group();
   // grupo de barandillas
      barandillasG = new Group();

   //reinicio//
    reiniciar = createSprite (300, 400, 80, 80);
    reiniciar.addImage(reiniciar_texture);

    //click//
    click = createSprite (300, 500, 40, 40);
    click.addImage(click_texture);
}



function draw() {
background("blue");





//funcion de resetear
if (mousePressedOver (reiniciar)){
  reseteo();
  
 }

  if (gameState === "play") {

     
        
      // visibilidad del boton de reinicio y click
      reiniciar.visible = false;
       click.visible = false;

      //escribir aquí el código para mover el fantasma a la izquierda al presionar la flecha izquierda
        if (keyDown("LEFT_ARROW")){
        calaca.velocityX= -5;
        calaca.velocityY= 0;
      }
   
  
    
      //escribir aquí el código para mover el fantasma a la derecha al presionar la flecha derecha
      if (keyDown("RIGHT_ARROW")){
        calaca.velocityX= 5;
        calaca.velocityY= 0;
      }

    
  
      //escribir aquí el código para QUE EL FANTASMA SALTE AL PRESIONAR SPACE
      if (keyDown ("space") ) {
        calaca.velocityY = -11.46;
       }
      
  
  calaca.velocityY = calaca.velocityY + 0.8; // TE ACUERDAS PARA QUE ERA ESTA INSTRUCCIÓN?
  
   
      //escribir una condición para desplazar infinitamente la torre
      torre.velocityY = 5;
      if (torre.y > 400){
        torre.y = 200;
      }


      // LLAMA A LA FUNCIÓN DE PUERTAS! 
       spawnDoors();

       // si varandilla group esta tocando al fantasma este se detiene
        if (barandillasG.isTouching(calaca)){
          calaca.velocityY = 0;
        }
       
  
      //escribir el código = SI EL FANTASMA TOCA EL CLIMBERSGROUP SE DETIENE. 
       if(invisibleBlockGroup.isTouching(calaca) || calaca.y > 600){
         calaca.velocityY = 0;
         gameState = "end";
       }
  

       
  
  
}
  if (gameState === "end"){
    calaca.velocityY = 0;
    calaca.velocityX = 0;
    calaca.changeAnimation("m", calaca_muerta);
    console.log ("end");
    reiniciar.visible = true;
    click.visible = true;
    click.scale = 0.05;
    //movimiento del click
     click.y = World.mouseY;
     click.x = World.mouseX;


    background ("black");
    stroke("rgb(128, 27, 10)");
    strokeWeight(10);
    fill("rgb(247, 62, 30 )");
    textSize(70);
    text("Fin del juego", 100, 300 );
    torre.y = -99999;
    
  }

    

  drawSprites();
}

function spawnDoors() // PARA QUE SIRVE ESTA FUNCION? 
 {
  if (frameCount % 240 === 0) {
    var puerta = createSprite(200, -50);
    var barandilla = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = barandilla.width;
    invisibleBlock.height = 2;
    //agregar la función random para que la puerta aparezca al azar
    puerta.x = Math.round(random (120, 400))
    barandilla.x = puerta.x;
    invisibleBlock.x = puerta.x;
    // AGREGAR DOOR AL GRUPO
      puerta.addImage ("p", puerta_texture);
      puerta.velocityY = 1;
    // AGREGAR CLIMBER AL GRUPO 
      barandilla.addImage ("b", barandilla_texture);
      barandilla.velocityY = 1;
      
    puerta.velocityY = 1;
    barandilla.velocityY = 1;
    invisibleBlock.velocityY = 1;

    calaca.depth = puerta.depth; // PARA QUE SIRVE ESTA INSTRUCCIÓN? 
    calaca.depth +=1;
    
    //agregar puertas al grupo//
     puertasG.add(puerta);
     //agregar invisible block al grupo//
     invisibleBlockGroup.add(invisibleBlock);
     //agregar barandillas al grupo
     barandillasG.add(barandilla);

    
    //asignar lifetime a la PUERTA, CIMBER E invisibleBlock = 800
     puertasG.setLifetimeEach (800);
     invisibleBlockGroup.setLifetimeEach (800);


    //agregar cada obstáculo al grupo obstaclesGroup.add(obstacle);
    //aquí los obstáculos son la puerta y  la barandilla o CLIMBER 
        invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);
  }
}

function reseteo (){
  gameState = "play";  
  reiniciar.visible = false;
  puertasG.destroyEach();
  barandillasG.destroyEach();
  invisibleBlockGroup.destroyEach();
  torre.y = 300;
  calaca.y = 200;
  calaca.x = 200;

}

