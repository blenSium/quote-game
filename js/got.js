let quoteDiv = document.querySelector("#got-quote");
let answersBtn = document.querySelectorAll(".btn-answer");
let score = document.querySelector("#score");
let startingTimer = 1; //setting start time to a minute
let timer = startingTimer * 90; //a minute is 60 seconds - js multiply startingMins by 60.
let countdownSec = document.getElementById('timer-countdown'); //where timer will be displayed


class GOT {
  constructor() {}
  nextQuote(quoteArr, characters) { //changing the quote randomly
    this.index = quoteArr[Math.floor(Math.random() * quoteArr.length)];
    quoteDiv.innerHTML = `<p id= "quote">"${this.index.sentence}"</p>`;
    answersBtn[Math.floor(Math.random() * answersBtn.length)].innerText =
      this.index.character.name; // the right answer will be in a random button
    answersBtn.forEach((button) => {
      if (button.innerText == "") { // the other buttons will get random characters name
        button.innerText =
          characters[Math.floor(Math.random() * characters.length)];
      }
    });
  }
  selectAnswer(e) { //choose answer - right or wrong
    let selectedAnswer = e.innerText;
    if (selectedAnswer == this.index.character.name) {
      console.log("correct");
      e.classList.add("correct");
      score.innerText++;
      setTimeout(function () {
        e.classList.remove("correct");
      }, 800);
    } else {
      e.classList.add("wrong");
      setTimeout(function () {
        e.classList.remove("wrong");
      }, 800);
    }
  }
  countdown(){ //timer
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds; //makes the seconds show as 00
  
    countdownSec.innerHTML = `${minutes}:${seconds}`; // display as 00:0, counting down  
     timer--;
    
    if(timer < 0) { // what changes when the timer is 0
      clearInterval(1);
      let gameOver = document.getElementById('game-over-btn');
      gameOver.classList.replace('hide', 'display')
      document.querySelector('.answers-buttons').classList.replace('d-flex','hide');
      quoteDiv.classList.add('hide')
      let finalScoreGot = document.createElement('h1')
      quoteDiv.append(finalScoreGot)
      document.getElementById('quote').classList.add('hide');
      finalScoreGot.innerText = `final Score: ${score.innerText}`
    }
  }
}

let got = new GOT();

async function quotesGot() {
  let response = await fetch(`https://api.gameofthronesquotes.xyz/v1/random/5`);
  let data = await response.json();
  console.log(data);
  let characters = data.map((a) => a.character.name); // create an array of the characters names
  let newSet = new Set(characters); // array without duplicates
  characters = [...newSet];
  got.nextQuote(data, characters);
  answersBtn.forEach((button) => {
    button.addEventListener("click", function () { // add event listener on the answers buttons
      got.selectAnswer(button);
      got.nextQuote(data, characters);
    });
  });
  setInterval(got.countdown, 1000); // counter will show every second. 

}
quotesGot(); // calling the function
