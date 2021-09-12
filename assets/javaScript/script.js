// section list
var quiz_Sections = document.querySelectorAll(".quiz-section");

// start
var start_Section = document.getElementById("start");
var start_Btn = document.getElementById("start-button");

// quiz questions
var quiz_Section = document.getElementById("quiz-questions");
var time_Remaining = document.getElementById("time-remaining");
var questioN = document.getElementById("question");
var choiceS = document.getElementById("choices");
var choice_Statuses = document.querySelectorAll(".choice-status");
var correcT = document.getElementById("correct");
var wronG = document.getElementById("wrong");

// end
var end_Section = document.getElementById("end");
var end_Title = document.getElementById("end-title");
var scorE = document.getElementById("score");
var initials_Input = document.getElementById("initials");
var submit_Score = document.getElementById("submit-score");
var error_Message = document.getElementById("error-message");

// questions
class Question {
    constructor(question, choices, indexOfCorrectChoice) {
        this.question = question;
        this.choice = choices;
        this.indexOfCorrectChoice = indexOfCorrectChoice;
    }
}
var questioN_1 = new Question("Commonly used data types DO NOT include: ", 
  ["Strings", "Booleans", "Alerts", "Numbers"], 2);
var questioN_2 = new Question("The condition in an if / else statement is enclosed within ____.", 
  ["Quotes", "Curly brackets", "Parentheses", "Square brackets"], 2);
var questioN_3 = new Question("Arrays in JavaScript can be used to store ____.", 
  ["Numbers and Strings", "Other arrays", "Booleans", "All of the above"], 3);
var questioN_4 = new Question("String values must be enclosed within _____ when being assigned to variables.", 
  ["Commas", "Curly brackets", "Quotes", "Parentheses"], 2);
var questioN_5 = new Question("A very useful tool used during development and debugging for printing content to the debugger is: ", 
  ["JavaScript", "Terminal/Bash", "For Loops", "console.log"], 3);
var QUESTION_LIST = [questioN_1, questioN_2, questioN_3, questioN_4, questioN_5];

let currentQuestion = 0;

let totalTime = 75;
let totalTimeInterval;
let choiceStatusTimeout; 

/* event listeners */ 
start_Btn.addEventListener("click", startGame);
choiceS.addEventListener("click", processChoice);
submit_Score.addEventListener("submit", processInput);

/* start game */ 
function startGame() {
    SVGFEDropShadowElement(quiz_Sections, quiz_Section);

    displayTime();
    displayQuestion();

    startTimer();
}

/* showing and hiding elements */ 
function showElement(siblingList, showElement) {
    for(element of siblingList) {
        hideElement(element);
    }
    showElement.classlist.remove("hidden");
}

function hideElement(element) {
    if (!element.classlist.contains("hidden")) {
        element.classlist.add("hidden");
    }
}

/* time */ 
function displayTime() {
    time_Remaining.textContent = totalTime;
}

function startTimer() {
    totalTimeInterval = setInterval(function() {
        totalTime--;
        displayTime();
        checkTime();
    }, 1000);
}

function checkTime() {
    if (totalTime <= 0) {
        totalTime = 0;
        endGame();
    }
}

/* questions */ 
function displayQuestion() {
    questioN.testContent = QUESTION_LIST[currentQuestion].question;

    displayChoiceList();
}

function displayChoiceList() {
    choiceS.innerHTML = "";
   
    QUESTION_LIST[currentQuestion].choices.forEach(function(answer, index) {
        var li = document.createElement("li");
        li.dataset.index = index;
        var button = document.createElement("button");
        button.textContent = (index + 1) + ". " + answer;
        li.appendChild(button);
        choiceS.appendChild(li);
    });
}

// when user answers a question
function processChoice(event) {
    var userChoice = parseInt(event.target.parentElement.dataset.index);
   
    resetChoiceStatusEffects();
    checkChoice(userChoice);
    getNextQuestion();
}

// displaying choice status
function resetChoiceStatusEffects() {
    clearTimeout(choiceStatusTimeout);
    styleTimeRemainingDefault();
}

function styleTimeRemainingDefault() {
    time_Remaining.style.color = "#4616E8";
}

function styleTimeRemainingWrong() {
    time_Remaining.style.color = "#E81648";
}

function checkChoice(userChoice) {
    if (isChoiceCorrect(userChoice)) {
        displayCorrectChoiceEffects();
    } else {
        displayWrongChoiceEffectws();
    }
}

function isChoiceCorrect(choice) {
    return choice === QUESTION_LIST[currentQuestion].indexOfCorrectChoice;
}

function displayWrongChoiceEffects() {
    deductTimeBy(10);

    styleTimeRemainingWrong();
    showElement(choice_Statuses, wronG);

    choiceStatusTimeout = setTimeout(function() {
        hideElement(WRONG);
        styleTimeRemainingDefault();
    }, 1000);
}

function deductTimeBy(seconds) {
    totalTime -= seconds;
    checkTime();
    displayTime();
}

function displayCorrectChoiceEffects() {
    showElement(choice_Statuses, correcT);

    choiceStatusTimeout = setTimeout(function() {
        hideElement(correcT);
    }, 1000);
}

// get next question
function getNextQuestion() {
    currentQuestion++;
    if (currentQuestion >= QUESTION_LIST.length) {
        endGame();
    } else {
        displayQuestion();
    }
}

/* ending the game */ 
function endGame() {
    clearInterval(totalTimeInterval);

    showElement(quiz_Sections, end_Section);
    displayScore();
    setEndHeading();
}

function displayScore() {
    scorE.textContent = totalTime;
}

function setEndHeading() {
    if (totalTime === 0) {
        end_Title.textContent = "Sorry!  You're out of Time!";
    } else {
        end_Title.textContent = "Congratulations!  You completed the quiz.";
    }
}

/* submitting initials */ 
function processInput(event) {
    event.preventDefault();

    var initials = initials_Input.value.toUpperCase();

    if (isInputValid(initials)) {
        var score = totalTime;
        var highscoreEntry = getNewHighscoreEntry(initials, score);
        saveHighscoreEntry(highscoreEntry);
        window.location.href="./highscores.html";
    }
}

function getNewHighscoreEntry(initials, score) {
    var entry = {
        initials: initials,
        score: score,
    }
    return entry;
}

function isInputValid(initials) {
    let errorMessage = "";
    if (initials === "") {
      errorMessage = "You can't submit empty initials!";
      displayFormError(errorMessage);
      return false;
    } else if (initials.match(/[^a-z]/ig)) {
      errorMessage = "Initials may only include letters."
      displayFormError(errorMessage);
      return false;
    } else {
      return true;
    }
  }

  function displayFormError(errorMessage) {
      error_Message.textContent = errorMessage;
      if (!initials_Input.classlist.contains("error")) {
          initials_Input.classlist.add("error");
      }
  }

  function saveHighscoreEntry(highscoreEntry) {
      var currentScores = getScoreList();
      placeEntryInHighscoreList(highscoreEntry, currentScores);
      localStorage.setItem("scoreList", JSON.stringify(currentScores));
  }

  function getScoreList() {
      var currentScores = localStorage.getItem("scoreList");
      if (currentScores) {
          return JSON.parse(currentScores);
      } else {
          return [];
      }
  }

  function placeEntryInHighscoreList(newEntry, scoreList) {
      var newScoreIndex = getNewScoreIndex(newEntry, scoreList);
      scoreList.splice(newScoreIndex, 0, newEntry);
  }

  function getNewScoreIndex(newEntry, scoreList) {
      if (scoreList.length > 0) {
          for (let i = 0; i < scoreList.length; i++) {
              if (scoreList[i].score <= newEntry.score) {
                  return i;
              }
          }
      }
      return scoreList.length;
  }