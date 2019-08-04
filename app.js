/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/



var scores, roundScore, activePlayer, diceOne, diceTwo, gamePlaying, lastDieOne, lastDieTwo;

init();


/*
dice = Math.floor(Math.random() * 6) +1;
console.log(dice);
*/



// altering
// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '<em>';
// document.querySelector('#current-' + activePlayer).textContent = '<em>' + dice + '<em>';


//reading
/*
var x = document.querySelector('#score-0').textContent;
console.log(x);
*/


/*
// regular function
function btn(){
	// do someting here
}

btn();

// passed function
// Event listeners
//MDN web events click mouse keyboard load onload etc
document.querySelector('.btn-roll').addEventListener('click', btn); 
*/



// Anonymous function 
document.querySelector('.btn-roll').addEventListener('click', function(){

	if(gamePlaying){
		lastDieOne = diceOne;
		lastDieTwo = diceTwo;
		//do something

		// 1. random number
		diceOne = Math.floor(Math.random() * 6) +1;
		diceTwo = Math.floor(Math.random() * 6) +1;
		// testing 
		//dice = 6;
		
		// 2. display the result
		var diceOneDOM = document.querySelector('.diceOne');
		var diceTwoDOM = document.querySelector('.diceTwo');
		diceOneDOM.style.display = 'block';
		diceOneDOM.src = 'dice-' + diceOne + '.png';
		diceTwoDOM.style.display = 'block';
		diceTwoDOM.src = 'dice-' + diceTwo + '.png';
	
		//3. update the round score IF  the rolled number was NOT a 1
		if(diceOne !== 1 && diceTwo !==1) {
			// add score. roundScore + dice 

			roundScore+= (diceOne + diceTwo);
			document.querySelector('#current-' + activePlayer).textContent = roundScore;

		} else {
			nextPlayer();
		}

		if(diceOne ===6 && lastDieOne ===6 && diceTwo === 6 && lastDieTwo){
			roundScore = 0;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
			scores[activePlayer] = 0;
			document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
			nextPlayer();

		}
	}


});




document.querySelector('.btn-hold').addEventListener('click', function() {
	if(gamePlaying){
		// add CURRENT score to GLOBAL score
		scores[activePlayer] += roundScore;

		// update the UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		//Check if player won the game
		if (scores[activePlayer] >= winScore){
		//declare winner
	
		document.getElementById('name-' + activePlayer).textContent = 'Winner!';
		document.querySelector('.diceOne').style.display = 'none';
		document.querySelector('.diceTwo').style.display = 'none';
		document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
		document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
		gamePlaying = false;
		} else {
		 // next player
		 nextPlayer();
		}

	}
		
});


function nextPlayer(){
	// next player
	// using ternary opertor ****************************
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;
	diceOne = 0;
	lastDieOne = 0;
	diceTwo = 0;
	lastDieTwo = 0;
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	//document.querySelector('.player-0-panel').classList.remove('active');
	//document.querySelector('.player-1-panel').classList.add('active');
	document.querySelector('.diceOne').style.display = 'none';
	document.querySelector('.diceTwo').style.display = 'none';

}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;
	diceOne = 0;
	lastDieOne = 0;
	diceTwo = 0;
	lastDieTwo = 0;

	document.querySelector('.diceOne').style.display = 'none';
	document.querySelector('.diceTwo').style.display = 'none';
   
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');

    // check input 

    // if input is null winscore is 100;

    // else input is textcontent

	
     var selectElement = document.querySelector('input[name="winScore"]');
     var selectedValue = selectElement.value;

     if (selectedValue > 0){
     	winScore = selectedValue;

     } else {
     	winScore = 100;
     }

          
}

