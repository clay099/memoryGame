const gameContainer = document.getElementById("game");
const restart = document.getElementById('restart');
const currentScoreText = document.getElementById('currentScore');
const bestScoreText = document.getElementById('bestScore');

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledColors = shuffle(COLORS);

// original function to loop over arry colors
// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
// function createDivsForColors(colorArray) {
//   for (let color of colorArray) {
//     // create a new div
//     const newDiv = document.createElement("div");

//     // give it a class attribute for the value we are looping over
//     newDiv.classList.add(color);

//     // call a function handleCardClick when a div is clicked on
//     newDiv.addEventListener("click", handleCardClick);

//     // append the div to the element with an id of game
//     gameContainer.append(newDiv);
//   }
// }

// updated functino to allow for id to be added
function createDivsForColors(colorArray) {
  for (i=0; i < colorArray.length; i++){
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(colorArray[i]);

    // add id to div
    newDiv.id = [i];

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// create variable selectedCards to save up to two values
let selectedCards = [];
// create variable savedCards for correct guesses to be pushed into
let savedCards = [];

// function to check if the background color is the same & the id is different
function cardMatch(selectedCards) {
  if (selectedCards[0].style.backgroundColor === selectedCards[1].style.backgroundColor 
    && selectedCards[0].id !== selectedCards[1].id ){
      selectedCards[0].classList ='true';
      selectedCards[1].classList ='true';
    }
}

// count current score
let currentScore = 0;
game.addEventListener("click", function(event){
  currentScore ++;
  currentScoreText.innerText = currentScore;
});

let count = 0;

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  // console.log("you just clicked", event.target);
  let card = event.target

  card.style.backgroundColor = card.classList.value;
  selectedCards.push(card);
  count ++;
  if(count ===3){
    selectedCards[0].style.backgroundColor = '';
    selectedCards[1].style.backgroundColor = '';
    selectedCards[2].style.backgroundColor = '';
    selectedCards = [];
    count = 0;
    alert('you cannot click more then 2 cards at a time');
  }
  
  // check if selected card variable is greater then two
  if(selectedCards.length >= 2){
    // run cardMatch funciton 
    cardMatch(selectedCards);
    // check if cardMatch provided a positive result
    if (selectedCards[0].classList == 'true'){
      // push selected cards to savedCards variable to not lose value
      savedCards.push(selectedCards);
      check();
      // empty selected cards
      selectedCards = [];
      // reset count 
      count = 0;
      // if not reset the selected cards array & change color back to default
      
    } else setTimeout(function(){ {
      selectedCards[0].style.backgroundColor = '';
      selectedCards[1].style.backgroundColor = '';
      selectedCards = [];
      count = 0;
      }
  },1500)};
}

// when the DOM loads - updated below
// createDivsForColors(shuffledColors);

// Start / reset button clears game and sets up a new one
restart.addEventListener("click", function(e){
  e.preventDefault();
  gameContainer.innerHTML='';
  let reshuffledColors = shuffle(COLORS);
  createDivsForColors(reshuffledColors);
  currentScore = 0;   
  savedCards = []; 
});

// retrieve from local storage
const savedBestScore = JSON.parse(localStorage.getItem('bestScore'));
bestScoreText.innerText = savedBestScore;

// add score to localstorage if all colors are completed
let check = function (){
  console.log(savedCards.length);
  // check savedCards arry is maximum
  if (savedCards.length === 5){
    currentScore +1;
    if (currentScore <= bestScoreText.innerText || bestScoreText.innerText === ""){
    localStorage.setItem('bestScore', JSON.stringify(currentScore));
    bestScoreText.innerText = currentScore;}
  }
};
