const gameContainer = document.getElementById("game");

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

let newColorArray = []

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
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

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  const bgColor = event.target.className

  //Clicking a card should change the background color to be the color of the class it has
  event.target.style.backgroundColor = bgColor

  //Add Flipped ClassList
  if(!event.target.classList.contains('correct-match')) {
    event.target.classList.add('flipped')
  } 

  //Push to newColorArray
  if(!event.target.classList.contains('correct-match')) {
    newColorArray.push(event.target.style.backgroundColor);
  }
 
  
  //Grab All Cards
  const cards = document.querySelectorAll('#game div')


  
  // Loop through each card
  cards.forEach(card => {
  //Loop through Cards and prevent more than one card from being selected
  cards.forEach(card => {
    //newColorArray is equal to 2 cards
    if(newColorArray.length === 2) {
      //if card does not contain flipped or correct-match, remove event listener 
      if(!card.classList.contains('flipped') || !card.classList.contains('correct-match')){
        card.removeEventListener('click', handleCardClick)
      }
    }
  })
  //if newColorArray is equal to two color
  if(newColorArray.length === 2) {
      if(newColorArray[0] === newColorArray[1]) {
        newColorArray = []
        cards.forEach(card => {
          if(card.classList.contains('flipped')){
            card.classList.remove('flipped')
            card.classList.add('correct-match')
            cards.forEach(card => {
              if(!card.classList.contains('correct-match')){
                card.addEventListener('click', handleCardClick)
              }
            })
          }
        })
      } else {
        newColorArray = []
        setTimeout(()=> {
          cards.forEach(card => {
            if(card.classList.contains('flipped')) {
              card.classList.remove('flipped')
              card.style.backgroundColor = ''
              //Readd event listener for cards
              cards.forEach(card => {
                card.addEventListener('click', handleCardClick)
              })
            }
          })
        }, 1000)
        
      }
    }
  })
  
}

// when the DOM loads
createDivsForColors(shuffledColors);
