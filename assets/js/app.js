// Globals
let counter;//countdown tracker
const timerEl = document.getElementById("timer");
const gameEl = document.getElementById("gameArea");
const startButton = document.createElement("button");
startButton.setAttribute("class", "btn btn-lg btn-dark");
startButton.textContent = "Let's Do it";
//initial div on the page
const instructions = document.createElement("p");
instructions.setAttribute("class", "instructions");
//area for question to show up
const questionDiv = document.createElement("div");
questionDiv.setAttribute("id","question-div");
//area for answers to show up
const answersUl = document.createElement("ul");
answersUl.setAttribute("id","answers-ul");
//Begin again button
const startOver = document.createElement("button");
startOver.setAttribute("class","btn btn-lg btn-success");
startOver.textContent = "Try Again";

//alerts
const correctAlert = document.createElement("div");
correctAlert.setAttribute("class", "alert alert-success");
correctAlert.textContent = "You are correct!";
//alerts
const inCorrectAlert = document.createElement("div");
inCorrectAlert.setAttribute("class", "alert alert-danger");
inCorrectAlert.textContent = "That is Incorrect!";
//alerts timer
function clearAlert() {
    console.log("Clear alert called");
    
    setTimeout(()=>{
        inCorrectAlert.remove();
        correctAlert.remove(); 
    },1000)
}



//Game Object
const game = {
    timer: 10,
    questionIndex:0,
    getScore:function(){
       let score = "You got " + game.correct + " out of " + game.questions.length;
       return score;
    },
    correct: 0,
    questions: [
        {
            q: "What is the reason for wrapping the entire content of a JavaScript source file in a function?",
            a: [
                "Creates a private namespace to avoid potential name clashes between different JavaScript modules and libraries.", "Doesn't matter",
                "If you call it .. they will come"
            ],
            c: 0
        },
        {
            q: "What are the benefits, of including 'use strict' at the beginning of a JavaScript source file?",
            a: [
                "This is not a thing",
                "You get the paddle if you get an error",
                "Enforce stricter parsing and error handling on your JavaScript code at runtime"
            ],
            c: 2
        },
        {
            q: "What is NaN? What is its type?",
            a: [
                "A value that is “not a number”,its type is: Number",
                "This is what I call my Grandmother",
                "Nationally Association of No Namers"
            ],
            c: 0
        }
    ],
    init: function () {
        instructions.textContent = "Beat the timer and Answer the questions";
        gameEl.appendChild(instructions);
        gameEl.appendChild(startButton);
    },
    startGame: function () {
            game.correct = 0;
            game.timer = 10;
            game.questionIndex = 0;
            console.log(`Game Started`);
            //hide the instructions
            gameEl.innerHTML = "";
            //start the timer
            game.timerStart();
            //Show the next question
            game.showNextQuestion();
        
    },
    showNextQuestion: function () {
        clearAlert();
          //Check to see if we are out of questions
        console.log(`Question # ${game.questionIndex}`);
        console.log(`Total Questions # ${game.questions.length}`);
        //Check to see what question we are on..
        if(game.questionIndex < game.questions.length){
            //empty the div
            questionDiv.innerHTML = "";
            answersUl.innerHTML = "";
            //Get the current question
            let currentQuestion = game.questions[game.questionIndex].q;
            console.log(`Current Question is: ${currentQuestion}`);
            //Show the question on the page
            questionDiv.innerHTML =  "<h3>"+ currentQuestion + "</h3>";
            let content = document.getElementById("gameArea");
            content.appendChild(questionDiv);
            //Show the answers on the page
            for (let index = 0; index < game.questions[game.questionIndex].a.length; index++) {
                //get the anawer from the array
                const possibleAnswer = game.questions[game.questionIndex].a[index];
                const answerLi = document.createElement("li");
                //add the text to the div
                answerLi.textContent = possibleAnswer;
                //add all the needed attributes
                answerLi.setAttribute("class","answerLi");
                answerLi.setAttribute("data", index);
                //attache the answer to the page
                answersUl.appendChild(answerLi)
            }
            content.appendChild(answersUl);
          
        }else{
            console.log(`We are past the last question`);
            //empty the question area
            questionDiv.innerHTML = "";
            answersUl.innerHTML = "";
            game.timerStop();
            //add the start over button
            gameEl.appendChild(startOver);
            //get the final score and append it to the page
            let Finalscore = game.getScore();
            timerEl.textContent = Finalscore;
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
    },
    getAnswer:function(e){
        //get the item we clicked on and check the data attribute
        if(e.target.matches("li")){
            console.log("data attribute", e.target.getAttribute("data"));
            //see if it's the correct anser
            if(e.target.getAttribute("data") == game.questions[game.questionIndex].c){
                gameEl.appendChild(correctAlert);
                //reset the timer
                game.timer = 10;
                //move to the next question
                game.questionIndex++;
                game.correct++;
                game.showNextQuestion();
            }else{
                gameEl.appendChild(inCorrectAlert);
                 //reset the timer
                game.timer = 10;
                //move to the next question
                game.questionIndex++;
                game.showNextQuestion();   
            }
        } 
    }
}
//run when the page loads
game.init();
// ==== Event Handlers ==== //
startButton.addEventListener("click",game.startGame);
startOver.addEventListener("click",game.startGame);
answersUl.addEventListener("click", game.getAnswer);
