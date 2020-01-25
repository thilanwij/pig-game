/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice, gameRunning;

scores = [0,0];
roundScore = 0;
activePlayer = 0;


init();

var prevDice;

function init(){
  scores[0] = 0; //sets score for player 1
  scores[1] = 0; //sets score for player 2
  activePlayer = 0; //sets active Player to be 1
  roundScore = 0;

  gameRunning = true;

  document.querySelector('.dice').style.display = 'none'; // Hides die
  document.getElementById('score-0').textContent = '0'; //resets display score
  document.getElementById('score-1').textContent = '0'; //resets display score
  document.getElementById('current-0').textContent = '0'; //resets current score
  document.getElementById('current-1').textContent = '0'; //resets current score
  document.getElementById('name-0').textContent = 'PLAYER 1'; //resets names
  document.getElementById('name-1').textContent = 'PLAYER 2'; //resets names

  if (document.querySelector('.player-0-panel').classList.contains('active')) {
    // do some stuff
  }
  else {
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    activePlayer = 0;

  }
}

function rollDieKey(event){
    var char = event.which || event.keyCode;
    // alert(char);
    if ((char === 83 && activePlayer === 0) || (char === 75 && activePlayer === 1)){ // if press S-P1, Press K-P2, then roll dice
      //  this part adds an event listener for clicks onto the roll button then does
      //  whatever it says below
      //alert(gameRunning);
        if (gameRunning){
          //1. Random Number
          dice = Math.floor(Math.random() * 6) + 1;

          //2. Display result
          var diceDOM = document.querySelector('.dice');
          diceDOM.style.display = 'block';
          diceDOM.src = 'dice-' + dice + '.png';


          if (dice === 6 && prevDice === 6){
            // reset score
            scores[activePlayer] = 0;
            document.getElementById("score-"+ activePlayer).textContent = 0;
            alert("You done did it!");
            nextPlayer();

          }
          //3. Update the round score IF the rolled number was NOT a 1.
          else if (dice !== 1){
            //Add score
            roundScore += dice;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;

          } else {
            //Next Player
            nextPlayer();

          }
            prevDice = dice;
        }

    };


    if (char === 13 && gameRunning == true){
      //Add current score to global scores
      scores[activePlayer] += roundScore;

      //Update UI
      document.getElementById("score-"+ activePlayer).textContent = scores[activePlayer];


      //Check if player won Game
      if (scores[activePlayer] >= 20){
          // alert("Player " + (activePlayer + 1) + " Wins!");
          document.getElementById("name-"+ activePlayer).textContent = "WINNER!";
          gameRunning = false;

          //Resets scores and hides die

          //checks to make sure active player goes to player one
          // if (document.querySelector('.player-0-panel').classList.contains('active')) {
          //   // do some stuff
          //   alert("I have active class!");
          // }
          // else {
          //   alert("I don't have active class!");
          //   document.querySelector('.player-0-panel').classList.add('active');
          //   document.querySelector('.player-1-panel').classList.remove('active');
          //   activePlayer = 0;
          //
          // }
          //Resets game because somebody won
          //init();
      }
      else {
        //if there is no winner yet, switch players
        nextPlayer();
      }

    }

    if (char === 78){
      init();
    }
}

document.querySelector('.btn-roll').addEventListener('click',function(){
//  this part adds an event listener for clicks onto the roll button then does
//  whatever it says below
//alert(gameRunning);
  if (gameRunning){
    //1. Random Number
    dice = Math.floor(Math.random() * 6) + 1;

    //2. Display result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';


    if (dice === 6 && prevDice === 6){
      // reset score
      scores[activePlayer] = 0;
      document.getElementById("score-"+ activePlayer).textContent = 0;
      alert("You done did it!");
      nextPlayer();

      //*************THERE IS AN ISSUE IF SOMEONE HOLDS AFTER A 6, IF THE NEXT PERSON GETS A 6 TOO, THEY SUFFER AND RESET!!!!
    }
    //3. Update the round score IF the rolled number was NOT a 1.
    else if (dice !== 1){
      //Add score
      roundScore += dice;
      document.querySelector("#current-" + activePlayer).textContent = roundScore;

    } else {
      //Next Player
      nextPlayer();

    }
      prevDice = dice;
  }

});

function nextPlayer(){
  //function to repeat when we need to switch players

  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = "none";

}

//Roll Button Logic
document.querySelector('.btn-hold').addEventListener('click',function(){
  if(gameRunning){
    //Add current score to global scores
    scores[activePlayer] += roundScore;

    //Update UI
    document.getElementById("score-"+ activePlayer).textContent = scores[activePlayer];


    //Check if player won Game
    if (scores[activePlayer] >= 20){
        // alert("Player " + (activePlayer + 1) + " Wins!");
        document.getElementById("name-"+ activePlayer).textContent = "WINNER!";
        gameRunning = false;

        //Resets scores and hides die

        //checks to make sure active player goes to player one
        // if (document.querySelector('.player-0-panel').classList.contains('active')) {
        //   // do some stuff
        //   alert("I have active class!");
        // }
        // else {
        //   alert("I don't have active class!");
        //   document.querySelector('.player-0-panel').classList.add('active');
        //   document.querySelector('.player-1-panel').classList.remove('active');
        //   activePlayer = 0;
        //
        // }
        //Resets game because somebody won
        //init();
    }
    else {
      //if there is no winner yet, switch players
      nextPlayer();
    }

  }
});

//New Game Button Logic
document.querySelector('.btn-new').addEventListener('click', init);
