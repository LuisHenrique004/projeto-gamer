import questions from "./questions.js";

const answers = document.querySelector(".answers");
const questions_content = document.querySelector(".questions");
const question = document.querySelector("#question");
const finish_content = document.querySelector(".finish");
const button_restart = document.querySelector(".restart");
const finish_message = document.querySelector(".message");
const next = document.querySelector(".next");
const current = document.querySelector(".current");
const total = document.querySelector(".total");
const error = document.querySelector(".error");
const image1 = document.querySelector("#image1");
const image2 = document.querySelector("#image2");
const symbol = document.querySelector("#symbol");

const modes = {
  "sum": {
    'symbol': "+",
  },
  "subtraction": {
    'symbol': "-"
  },
  "multiplication": {
    'symbol': "*"
  },
  "division": {
    'symbol': "/"
  },
  "comparasion": {
    "symbol": "?"
  }
}

let current_mode;

let currentIndex = 0;
let questionsCorrect = 0;
let answered = false;
let mode_questions;

changeMode("sum")

document.querySelectorAll(".mode").forEach((item) => {
  item.addEventListener("click", function() {
    changeMode(item.getAttribute("value"))
  });
});

function changeMode(mode) {
  mode_questions = questions[mode]

  questions_content.style.display = "flex";
  finish_content.style.display = "none";

  current_mode = modes[mode];

  currentIndex = 0;
  questionsCorrect = 0;
  current.innerHTML = currentIndex + 1;
  total.innerHTML = mode_questions.length;
  answered = false;
  loadQuestions();

  return false;
}

button_restart.onclick = () => {
  questions_content.style.display = "flex";
  finish_content.style.display = "none";

  currentIndex = 0;
  questionsCorrect = 0;
  current.innerHTML = currentIndex + 1;
  total.innerHTML = mode_questions.length;
  answered = false;
  loadQuestions();
};

next.onclick = () => {
  if (answered){
    if (currentIndex < mode_questions.length - 1) {
      currentIndex++;
      current.innerHTML = currentIndex + 1;
      answered = false;
      loadQuestions();
    } else {
      finish();
    }
  } else {
    error.style.display = "block"
  }
}

function answerQuestion(e){
  if (!answered) {
    error.style.display = "none";
    answered = true;
    if (e.currentTarget.getAttribute("data-correct") === "true") {
        questionsCorrect++;
        e.currentTarget.style.backgroundColor = "#90ee90";
        var audiocerto = document.querySelector("#audio-correto")
        audiocerto.play();
        
    } else {
        e.currentTarget.style.backgroundColor = "#ffcccb";
        var audioerrado = document.querySelector("#audio-errado");
        audioerrado.play();
        document.querySelectorAll(".option").forEach((item) => {
          if (item.getAttribute("data-correct") === "true") {
            item.currentTarget.style.backgroundColor = "#90ee90";
          }
        });
      }
  }
}

function finish() {
  finish_message.innerHTML = `Você acertou ${questionsCorrect} de ${mode_questions.length}`;
  questions_content.style.display = "none";
  finish_content.style.display = "flex";
}

function loadQuestions(){
    const item = mode_questions[currentIndex];
    question.innerHTML = item.question;
    answers.innerHTML = "";

    const image = "<img class='image' src='assets/orange.png'></img>";
    image1.innerHTML = image.repeat(item['number1']);
    image2.innerHTML = image.repeat(item['number2']);

    symbol.innerHTML = current_mode.symbol

    item.answers.forEach((answer) => {
        const div = document.createElement("div");
        const optionContent = image.repeat(answer.option);

        div.innerHTML = `
        <button class="option" data-correct="${answer.correct}">
        ${answer.option}
        <span class='option-images'> 
        ${optionContent}
        </span>
        </button>
        `;
    
        answers.appendChild(div);
        
        document.querySelectorAll(".option").forEach((item) => {
            item.addEventListener("click", answerQuestion);
        });
    });
}