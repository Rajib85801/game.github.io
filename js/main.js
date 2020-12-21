const gameArea = document.querySelector('.gameArea');
const gameStartBtn = document.getElementById('gameStartBtn');
const startPopUp = document.querySelector('.start-PopUp');
const score = document.querySelector('.score');

let keys = { ArrowUp : false, ArrowDown : false, ArrowLeft : false, ArrowRight : false};
let player = { moveSpeed : 10, score : 0 };

gameStartBtn.addEventListener('click', startGame);

document.addEventListener('keydown', ArrowDown);
document.addEventListener('keyup', ArrowUp);

function ArrowDown(e){
  keys[e.key] = true;
}

function ArrowUp(e){
  keys[e.key] = false;
}


function playGame(){
  let car = document.querySelector('.car');
  let roadArea = gameArea.getBoundingClientRect();

  if(player.start){

    if(keys.ArrowUp  && player.y > (roadArea.height / 2) - 85){ player.y -= player.moveSpeed };

    if(keys.ArrowDown && player.y < (roadArea.height - 85)){ player.y += player.moveSpeed };

    if(keys.ArrowLeft && player.x > 0){ player.x -= player.moveSpeed };

    if(keys.ArrowRight && player.x < (roadArea.width - 50)){ player.x += player.moveSpeed };

    car.style.left = player.x + 'px';
    car.style.top =  player.y + 'px';

    // counting the score
    score.innerHTML = "score: " + player.score;

    moveLines();
    moveEnemy(car);

    window.requestAnimationFrame(playGame);
    player.score++;
    
  }
}



function startGame() {
  startPopUp.classList.add('hide');
  gameArea.innerHTML = "";
  score.classList.add('show');
  player.start = true;
  player.score = 0;

  for( let x = 0; x < 10; x++){
    let roadLine = document.createElement('div');
    roadLine.setAttribute("class", "lines");
    roadLine.y = (x * 150);
    roadLine.style.top = roadLine.y + "px";
    gameArea.appendChild(roadLine);
  }

  let car = document.createElement('div');
  car.setAttribute("class", "car");
  gameArea.appendChild(car);

  player.x = car.offsetLeft;
  player.y = car.offsetTop;

  for( let x = 0; x < 3; x++){
    let enemyCar = document.createElement('div');
    enemyCar.setAttribute("class", "anemy-car");
    enemyCar.y = ((x+1) * 350 * -1);
    enemyCar.style.backgroundColor = randomColor();
    enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
    enemyCar.style.top = enemyCar.y + "px";
    gameArea.appendChild(enemyCar);
  }

  window.requestAnimationFrame(playGame);
}



function isOver(mainCar,randCar){
  let mainCarPos = mainCar.getBoundingClientRect();
  let randCarPos = randCar.getBoundingClientRect();


  return !((mainCarPos.bottom < randCarPos.top) || (mainCarPos.top > randCarPos.bottom) || (mainCarPos.right < randCarPos.left)||(mainCarPos.left > randCarPos.right));
  
}



function moveLines(){
  let lines = document.querySelectorAll('.lines');

  lines.forEach(function(item){

  let gameAreaHeight = gameArea.clientHeight;

    if(item.y >= gameAreaHeight){
      item.y = player.moveSpeed;
    }else{
      item.y += player.moveSpeed;
    }

    
    item.style.top = item.y + "px";

  })
}


function moveEnemy(car){
  let enemys = document.querySelectorAll('.anemy-car');

  enemys.forEach(function(item){

  let gameAreaHeight = gameArea.clientHeight;

    if(isOver(car,item)){
      gameOver();
    }

    if(item.y >= gameAreaHeight){
      item.y = player.moveSpeed;
      item.style.left = Math.floor(Math.random() * 350) + "px";
    }else{
      item.y += player.moveSpeed;
    }

    
    item.style.top = item.y + "px";

  })
}

function randomColor(){
  let colors = ["#f5f6fa","#fbc531","#e84118","#ff0a86","#375dc3"];
  let colorIndex = Math.floor(Math.random() * colors.length);
  console.log(colors[colorIndex])
  return colors[colorIndex];
}


function gameOver(){
      // stop game
      player.start = false;

      // show popUp again and change textcontent
       startPopUp.classList.remove('hide');
       gameStartBtn.innerText = "play again";
       // change score textcontent
       startPopUp.querySelector("p").innerHTML = `<p> game over <i class="fas fa-sad-tear"></i> <br/> Press The Button And play again.</p>`;

       // change btn background
       gameStartBtn.classList.add("changeBg");

       // change score textcontent
       score.innerHTML = `<p> game over <br/> your Score was ${player.score}.</p>`;
    }