const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");
const scoreContainer = document.getElementById("score-container");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-button");
const timerElement = document.getElementById("time");

const questions = [
  {
    question: "Grand Central Terminal, Park Avenue, New York is the world's?",
    answers: [
      { text: "highest railway station", correct: false },
      { text: "longest railway station", correct: false },
      { text: "largest railway station", correct: true },
      { text: "None of the above", correct: false },
    ],
  },
  {
    question: "Entomology is the science that studies?",
    answers: [
      { text: "Behavior of human beings", correct: false },
      { text: "Insects", correct: true },
      {
        text: "The origin and history of technical and scientific terms",
        correct: false,
      },
      { text: "The formation of rocks", correct: false },
    ],
  },
  {
    question: 'Who wrote "To Kill a Mockingbird"?',
    answers: [
      { text: "Harper Lee", correct: true },
      { text: "Mark Twain", correct: false },
      { text: "Ernest Hemingway", correct: false },
      { text: "F. Scott Fitzgerald", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
const timeLimit = 15;

function startGame() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.style.display = "none";
  scoreContainer.style.display = "none";
  questionContainer.style.display = "block";
  startTimer();
  showQuestion(questions[currentQuestionIndex]);
}

function startTimer() {
  let timeLeft = timeLimit;
  timerElement.innerText = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timerElement.innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      selectAnswer({ correct: false }); // Automatically select wrong answer when time runs out
    }
  }, 1000);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  answerButtons.innerHTML = "";
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => {
      clearInterval(timer); // Stop the timer when an answer is selected
      selectAnswer(answer);
    });
    answerButtons.appendChild(button);
  });
}

function selectAnswer(answer) {
  const correct = answer.correct;
  if (correct) {
    score++;
  }
  Array.from(answerButtons.children).forEach((button) => {
    button.disabled = true; // Disable all buttons after an answer is selected
    if (button.innerText === answer.text) {
      button.classList.add(correct ? "correct" : "wrong");
    }
  });
  nextButton.style.display = "block"; // Show the next button
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    clearInterval(timer); // Clear the timer before showing the next question
    startTimer(); // Start a new timer for the next question
    showQuestion(questions[currentQuestionIndex]);
  } else {
    questionContainer.style.display = "none";
    scoreContainer.style.display = "block";
    scoreElement.innerText = score;
  }
});

restartButton.addEventListener("click", startGame);

startGame();
