var startButton = document.getElementById("start");
var timerStart = document.getElementById("timer"); // countdown
var questionEl = document.getElementById("question"); // questionElement
var trueButton = document.getElementById("true");  // true
var falseButton = document.getElementById("false");  // false
var finishedTest = document.getElementById("finishedTest");  // completedTest
var currentQuestion = 0;
var timeLeft = 60;
var score = 0;
var questions = [
    { q: "Is ECMAScript another name for javaScript?", a: true },
    { q: "Using the HTML DOM, javaScript can access and change all elements of an HTML document?", a: true },
    { q: "In javaScipt the === operator ignores data being logged?", a: false },
    { q: "localStorage can be used to store and retrieve user data using javaScript?", a: true },
    { q: "To access button clicks we use onselect in javaScript", a: false },
]

startButton.addEventListener("click", startQuiz);
trueButton.addEventListener("click", () => answerQuestion(true));
falseButton.addEventListener("click", () => answerQuestion(false));

function startQuiz() {
    
}
