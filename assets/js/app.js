// Globals
let counter;//countdown tracker
const timerEl = document.getElementById("timer");
const gameEl = document.getElementById("gameArea");
const startButton = document.createElement("button")
startButton.setAttribute("class", "btn btn-dark");
startButton.textContent = "Let's Do it";
//initial div on the page
const instructions = document.createElement("div");
instructions.setAttribute("class", "instructions");
//div for question to show up
const questionDiv = document.createElement("div");
questionDiv.setAttribute("id","question-div");



//Game Object
const game = {
    timer: 10,
    questionIndex:0,
    getScore:function(){
       let score = "You got " + game.correct + " / " + game.questions.length;
       return score;
    },
    correct: 0,
    questions: [
        {
            q: "What is the reason for wrapping the entire content of a JavaScript source file in a function?",
            a: [
                "creates a private namespace to avoid potential name clashes between different JavaScript modules and libraries.", "Doesn't matter",
                "There is no correct answer for this question"
            ],
            c: "creates a private namespace to avoid potential name clashes between different JavaScript modules and libraries."
        },
        {
            q: "What are the benefits, of including 'use strict' at the beginning of a JavaScript source file?",
            a: [
                "This is not a thing",
                "You get the paddle if you get an error",
                "Enforce stricter parsing and error handling on your JavaScript code at runtime"
            ],
            c: "Enforce stricter parsing and error handling on your JavaScript code at runtime"
        },
        {
            q: "What is NaN? What is its type?",
            a: [
                "A value that is “not a number”,its type is: Number",
                "This is what I call my Grandmother",
                "Nationally Association of No Namers"
            ],
            c: "a value that is “not a number”,its type is: Number"
        }
    ],
    init: function () {
        instructions.textContent = "Beat the timer and Answer the questions \n Click Start to begin";
        gameEl.appendChild(instructions);
        gameEl.appendChild(startButton);
    },
    startGame: function () {
            console.log(`Game Started`);
            //start the timer
             game.timerStart();
            //Show the next question
             game.showNextQuestion();
        
    },
    showNextQuestion: function () {
          //Check to see if we are out of questions
        console.log(`Question # ${game.questionIndex}`);
        console.log(`Total Questions # ${game.questions.length}`);
        //Check to see what question we are on..
        if(game.questionIndex < game.questions.length){
            //Get the current question
            let currentQuestion = game.questions[game.questionIndex].q;
            console.log(`Current Question is: ${currentQuestion}`);
            
            //Show the question on the page
            questionDiv.innerHTML =  "<h3>"+ currentQuestion + "</h3>";
            let content = document.getElementById("gameArea");
            content.appendChild(questionDiv);
          
        }else{
            console.log(`We are past the last question`);
            game.timerStop();
            //get the final score and append it to the page
            let Finalscore = game.getScore();
            timerEl.textContent = "Your Final score was: " + Finalscore;
        }
    },
    timerStart:function(){
        //make sure we have one timer
        clearInterval(counter);
        //our timer interval every second
        counter = setInterval(game.countDown, 1000);
        console.log(`Timer Started.`);
    },
    timerStop:function () {
        console.log(`Stopping Timer`);
        clearInterval(counter);
    },
    countDown: function(){
        //decrement the timer
        game.timer--;
        // console.log(`Timer is at: ${game.timer}`);
        //show timer on the page
        timerEl.textContent = game.timer + " Seconds Left";
        //stop timer if it gets to Zero
        if(game.timer <= 0){
            questionDiv.innerHTML = "Times UP!!";
            //reset the timer
            game.timer = 10;
             //move to the next question
            game.questionIndex++;
            game.showNextQuestion();
        }  
    }
}
//run when the page loads
game.init();
// ==== Event Handlers ==== //
startButton.addEventListener("click",game.startGame);