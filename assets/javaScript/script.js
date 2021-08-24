var startButton = document.getElementById("start");
var timerStart = document.getElementById("timer"); 
var questionEl = document.getElementById("question"); 
var trueButton = document.getElementById("true");  
var falseButton = document.getElementById("false");  
var finishedTest = document.getElementById("finishedTest");  
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
    startButton.hidden = true;
    timerStart.hidden = false;
    trueButton.hidden = false;
    falseButton.hidden = false;


    startTimer();
    displayQuestion();
}

function startTimer() {
    var timeInterval = setInterval(function () {

        if (timeLeft > 1) {
            timerStart.textContent = timeLeft + "seconds remaining";
            timeLeft--;
        } else if (timeLeft === 1) {
            timerStart.textContent = timeLeft + "second remaining";
            timeLeft--;
        } else {
            timerStart.textContent = ""
            clearInterval(timeInterval)
        }
    }, 1000);
}

function answerQuestion(answer) {

    if (currentQuestion <= questions.length && questions[currentQuestion].a === answer) {
        score ++;

    } else {
        timeLeft -= 5;
    }
    currentQuestion ++;
    displayQuestion();
}

function displayQuestion() {
    if (currentQuestion >= questions.length) {
        displayScoreMessage();
    }
    questionEl.textContent = questions[currentQuestion].q;

}

function displayScoreMessage() {
    finishedTest.hidden = false;
    finishedTest.textContent = ("The test is over.  Your score is " + score);
}
