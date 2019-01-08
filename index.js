var form = document.querySelector("form");
var c = document.getElementById('canvas');
var ctx = c.getContext("2d");

var box = 10;
// le canvas x=50*box;y=50*box;

// direction axe x et y;
var dx=10;
var dy=0;

//snake
var snake =[];

snake[0] = {
    x : 60,
    y : 10,
    width:10
};


//fruit

var fruit = {
    x :Math.floor(Math.random()*50-0)*box,
    y :Math.floor(Math.random()*50-0)*box,
    width :10
}

//score
var score=0;
var affscore = document.querySelector("p");
favDialog.showModal();



function difficulte(output){
    switch(output){
        case "Facile":
        favDialog.close();
        setInterval(draw,100);
        break;
        case "Moyen":
        favDialog.close();
        setInterval(draw,80);
        break;
        case "Difficile":
        favDialog.close();
        setInterval(draw,50);
        break;
        case "Extra_Difficile":
        favDialog.close();
        setInterval(draw,30);
        break;
    }
}


function start(){
    // recuperer la valeur selectionnée du form dialog 
form.addEventListener("submit", function(event) {
  var data = new FormData(form);
  var output = "";
  for (const entry of data) {
    output =  entry[1];
  };
  difficulte(output);
  event.preventDefault();
}, false);
}

//direction du snake

document.addEventListener("keypress",direction);
var d;

function direction(e){
   
    // touche z = 90(haut)
    switch(e.key ){
        case 'z' :
        if( d != "bas"){
        d="haut";
        }
        break;
    //touche s = 83(bas)
     case 's' :
     if( d != "haut"){
        d="bas";
        }
        break;
    // touche e =69 (droite) 
    case 'e':
    if( d != "gauche"){
        d="droite";
        }
        break;
    // touche a = 65 (gauche)
    case 'a':
    if( d != "droite"){
        d="gauche";
    }
        break;
    }
}

function collision(head,array){
    
        for( var i = 0; i < array.length ; i++){
            if(head.x == array[i].x && head.y == array[i].y){
                return true;
            }
            
        }
        return false;
}


function draw(){
    
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //snake

    for( let i = 0; i < snake.length ; i++){
        
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
        ctx.fill();
        ctx.closePath();
        
    }

    snake[0].x += dx;
        //fruit
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.rect(fruit.x,fruit.y, fruit.width, fruit.width); 
        ctx.fill();
        ctx.closePath();

        //definition de la tete du snake
        var snakeX = snake[0].x;
        var snakeY = snake[0].y;

        //Déplacement du snake
       
        if(d == "bas"){snakeY +=box; dx=0};
        if(d == "haut"){snakeY -=box; dx=0};
        if(d == "gauche"){snakeX -=box; dy=0};
        if(d == "droite"){snakeX +=box; dy=0};
       
        // si le snake mange le fruit
        if(snake[0].x == fruit.x && snake[0].y == fruit.y){
        score++;
        affscore.innerHTML=score;
            fruit ={
                x :Math.floor(Math.random()*50-0)*box,
                y :Math.floor(Math.random()*50-0)*box,
                width :10
            }
        }else{
            // Annuler le pop permanent du snake
            snake.pop();
        }

        var newHead = {
            x : snakeX,
            y : snakeY
        };

        // game_over
       if(snakeX > canvas.width || snakeX<0-box || snakeY > canvas.height || snakeY <0-box || collision(newHead,snake) ){
        alert("GAME OVER");
        document.location.reload();
        }

        snake.unshift(newHead);
              
}

start();