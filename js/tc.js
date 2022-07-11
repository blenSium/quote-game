const TC = [
  { quote: "אתה ליצן", fname: "אבישי" },
  { quote: "אביבי", fname: "יעקב" },
  { quote: "אמא שלי בריאקט", fname: "עומר" },
  { quote: "mad", fname: "אמיר" },
  { quote: "ארגיומטר(ארגיומנט)", fname: "בנג'ה" },
  { quote: "let's go boy", fname: "אור" },
  { quote: "אמא שלך מפולנייה?", fname: "עודד" },
  { quote: "לי יש כבר עבודה", fname: "עומר" },
  { quote: "מי שנשאר שבת יש אינג'רה", fname: "שלומי" },
  { quote: "no homo", fname: "אור" },
];

let names = TC.map((c) => c.fname); // create an array of the characters names
let quoteSection = document.querySelector("#tc-quote");
let optionsBtn = document.querySelectorAll(".btn-answer");
let score = document.querySelector("#score");

let startingMinutes = 1; //setting start time to a minute
let time = startingMinutes * 30; //a minute is 60 seconds - js multiply startingMins by 60.
let countdownEl = document.getElementById('timer'); //where timer will be displayed

class TechCareer {
  constructor(arrQuote) {
    this.arrQuote = arrQuote;
  }
  displayQuote() { //changing the quote randomly
     this.quoteIndex =
      this.arrQuote[Math.floor(Math.random() * this.arrQuote.length)];
    quoteSection.innerHTML = `<p id="quote">"${this.quoteIndex.quote}"</p>`;
    optionsBtn[Math.floor(Math.random() * optionsBtn.length)].innerText =
      this.quoteIndex.fname; // the right answer will be in a random button
    optionsBtn.forEach((button) => {
      if (button.innerText == "") { // the other buttons will get random characters name
        button.innerText = names[Math.floor(Math.random() * names.length)];
      }
    });
  }
  chooseAnswer(e) { //choose answer - right or wrong
    let pickedAnswer = e.innerText;
    if (pickedAnswer == this.quoteIndex.fname) {
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
   updateCountdown(){ // timer
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds; //makes the seconds show as 00
  
    countdownEl.innerHTML = `${minutes}:${seconds}`; // display as 00:0, counting down   
     time--;
    
    if(time < 0) { // what changes when the timer is 0
      clearInterval(1);
      let gameOver = document.getElementById('game-over');
      gameOver.style.cssText = 'width:300px; height:120px'
      gameOver.classList.replace('hide', 'display')
      document.querySelector('.answers-buttons').classList.replace('d-flex','hide');
      quoteSection.classList.add('hide')
      let finalScore = document.createElement('h1')
      quoteSection.append(finalScore)
      document.getElementById('quote').classList.add('hide');
      finalScore.innerText = `final Score: ${score.innerText}`
    }
  }

}

let techCareer = new TechCareer(TC);

techCareer.displayQuote();
optionsBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    techCareer.chooseAnswer(btn);
    techCareer.displayQuote();
  });
});

setInterval(techCareer.updateCountdown, 1000); // counter will show every second. 

