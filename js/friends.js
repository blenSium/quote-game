let divQuote = document.querySelector("#friend-quote");
let answersBtn = document.querySelectorAll(".btn-answer");
let score = document.querySelector("#score");

let startingPoint = 1; //setting start time to a minute
let timer = startingPoint * 60; //a minute is 60 seconds - js multiply startingMins by 60.
let countdownDiv = document.getElementById('countdown'); //where timer will be displayed



class Friends {
  constructor() {}
  nextQuote(quoteArr, char) {
    this.index = quoteArr[Math.floor(Math.random() * quoteArr.length)];
    divQuote.innerHTML = `<p id="quote">"${this.index.quote}"</p>`;
    answersBtn[Math.floor(Math.random() * answersBtn.length)].innerText =
      this.index.character;
    answersBtn.forEach((button) => {
      if (button.innerText == "") {
        button.innerText = char[Math.floor(Math.random() * char.length)];
      }
    });
  }
  selectAnswer(e) {
    let selectedAnswer = e.innerText;
    if (selectedAnswer == this.index.character) {
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
  countdown(){
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds; //makes the seconds show as 00
  
    countdownDiv.innerHTML = `${minutes}:${seconds}`; // display as 00:0, counting down  
     timer--;
    
    if(timer < 0) {
      clearInterval(1);
      let gameOver = document.getElementById('game-over-btn');
      gameOver.style.cssText = 'width:300px; height:120px'
      gameOver.classList.replace('hide', 'display')
      document.querySelector('.answers-buttons').classList.replace('d-flex','hide');
      divQuote.classList.add('hide')
      let finalScoreFriends = document.createElement('h1')
      divQuote.append(finalScoreFriends)
      document.getElementById('quote').classList.add('hide');
      finalScoreFriends.innerText = `final Score: ${score.innerText}`
    }
  }


}

let friends = new Friends();

const guessFriends = () => {
  axios
    .get("https://friends-quotes-api.herokuapp.com/quotes")
    .then((response) => {
      const quotes = response.data;
      let characters = quotes.map((b) => b.character);
      var mySet = new Set(characters);
      characters = [...mySet];
      friends.nextQuote(quotes, characters);
      answersBtn.forEach((button) => {
        button.addEventListener("click", function () {
          friends.selectAnswer(button);
          friends.nextQuote(quotes, characters);
        });
      });
      setInterval(friends.countdown, 1000); // counter will show every second. 
    })
    .catch((error) => console.error(error));
};
guessFriends();
