//start button
//timer starts and one question displays
//correct? 
// congratulations
//incorrect?
//NUh-UH! + display correct answer
//final screen shows correct/incorrect
//restart button without reloading the page 


const quiz = [
    {
        q: "Why do my plants always die?",
        choices: ["No sun", " No Water", " I like to watch them die", "IDK"],
        correct: "IDK"
    },
    {
        q: "What does number '42' represent?",
        choices: ["101010", "a natural number that succeeds 41 and preceeds 43", "answer to the meaning of life, the universe, and everything", "IDK"],
        correct: "answer to the meaning of life, the universe, and everything"
    },
    {
        q: "What do ogres have?",
        choices: ["rancid breath", "layers, like onions", "Scottish accents", "IDK"],
        correct: "layers, like onions"
    },
    {
        q: "What has a giant head and tiny arms?",
        choices: ["big bird", "t-rex", "Jeff Goldblum", "IDK"],
        correct: "t-rex"
    },
    {
        q: "What's his only wish?",
        choices: ["life, liberty and the persuit of happiness", "to find his one true love", "to catch a fish, so juicy sweeeeet", "IDK"],
        correct: "to catch a fish, so juicy sweeeeet"
    },
    {
        q: "Who finds your lack of faith disturbing?",
        choices: ["Darth Vader", "Darth Maul", "Sheev Palpatine", "IDK"],
        correct: "Darth Vader"
    },
    {
        q: "What is Scar's favorite song?",
        choices: ["'It's a Small World'", "'I've Got a Lovely Bunch of Coconuts'", "'MMMMBOP'", "IDK"],
        correct: "'It's a Small World'"
    },
    {
        q: "Who lives on Drury Lane?",
        choices: ["The Gingerbread Man", "Ian Dury", "The Muffin Man", "IDK"],
        correct: "The Muffin Man"
    },
    {
        q: "Who's the fairest one of all?",
        choices: ["Snow White", "Grumpy", "The Queen", "IDK"],
        correct: "Snow White"
    },
    {
        q: "Who's the best minion?",
        choices: ["BOB", "Kevin", "Kevin again", "IDK"],
        correct: "Kevin again"
    },
];


//initial values 


let counter = 10; //new version of js uses let
let currentQ = 0;
let scoreC = 0;
let lost = 0;
let timer = 0;

function nextQ() {   //creating function to move to call net question

    const ifQuizComplete = (quiz.length - 1) === currentQ; //is the array of quiz index = to the current question index?
    if (ifQuizComplete) {

        //TODO: create logic to end game
        console.log("GAME OVER!");
        quizResults(); // displays final results once game ends
    } else {

        currentQ++; //incrementing var by 1
        questionL(); // calling question load function which will also call the choices function & loop
    }
}

//see below TODO; this alerts when timer ends!

function noTime() {

    clearInterval(timer); //stoping time at 0

    lost++; // incrementing losses due to no time left
    loadI('lost');
    setTimeout(nextQ, 3 * 1000);
     // calling function to reset to next question
}

function cDown() {

    counter--;
    $("#time").html("Timer: " + counter); //as timer counts down, this displays it

    if (counter === 0) {

        //TODO
        noTime();
    }
}

function questionL() { // current question  with choices loads and displays into browser

    counter = 10; //making sure timer restarts at 15
    timer = setInterval(cDown, 1000); // 1000ms = 1s

    
    const q = quiz[currentQ].q; // how I load questions 
    console.log(q)


    const choices = quiz[currentQ].choices; // how I load choices
    console.log(choices)

    $("#time").html("Timer: " + counter); // holding timer on the screen
    console.log(counter)

    $('#game').html(`<h4>${q}</h4> 
    
    ${choicesL(choices)}
    ${remainingQs()}

    `)
}; //calling choicesL(choices) function to run here


function choicesL(choices) {

    let result = ''; //providing string to display result

    for (let i = 0; i < choices.length; i++) { //looping over choice values
        result += `<p class="userChoice" data-answer= "${choices[i]}">${choices[i]}</p>`; //setting data vaule and displaying them onto the page
    }

    return result; //returning result to display this function in questionL ()
};

//create logic to continue game dspite correct/incorrect answer

$(document).on("click", ".userChoice", function () { //takes user click

    clearInterval(timer); //makes time work correctly when user picks correct/incorrect answer

    console.log("YIPPPEEEE!");
    const picked = $(this).attr('data-answer'); //this refers to document on click user choice data
    console.log(picked);
    const correct = quiz[currentQ].correct; //get's correct answer

    if (correct === picked) { //increments wins/losses based on correct/incorrect picked

        scoreC++; //increment score
        console.log("WIN!");
        loadI('win'); 
        setTimeout(nextQ, 3 * 1000); //calls next question function written above when user wins
    } else {

        lost++;
        console.log("LOOOOSER!");
        loadI('lost'); //calling giphy for fail
        setTimeout(nextQ, 3 * 1000); //calls next question function written above when user loses
    }
});

function quizResults() {  //displays all of users answers
     
    const results = `
        <p>Correct: ${scoreC}</p>
        <p>Missed: ${lost}</p>
        <p>Questions Asked: ${quiz.length}</p>
        <button class="btn btn-secondary" id="reset"> Play Again</button> 
        `;
    $("#game").html(results); //Play again button being created dynamically so using document on click to get it
}

$(document).on("click", "#reset", function () {
    console.log("Testin button!");

    counter = 10; //new version of js uses let
    currentQ = 0;
    scoreC = 0;
    lost = 0;
    timer = null;

    questionL(); //starting game at Q1
});

function remainingQs() { //logic to calc/show remaining questions

        const qLeft = quiz.length -(currentQ + 1); //starts value of quiz array at one instead of 0
        const lengthQ = quiz.length;

        return `Questions Remaining: ${qLeft}/${lengthQ}`;
}

//starts the game

$('#go').click(function(){

    $('#start').remove(); //removes start button once clicked
    $("#time").html(counter); //shows timer
    questionL(); // starts q load
})

//images content

const goodG = [
    './assets/images/jason.webp',
    './assets/images/cheers.webp', // Images positive
    './assets/images/utters.webp'
];

const badG = [
    './assets/images/gma.webp',
    './assets/images/jimmy.webp',
    './assets/images/dunkFail.webp', // Images fail
    './assets/images/dylFail.webp'
];


//images functions
function randomI(images) {

    const random = Math.floor(Math.random() * images.length);
    const randomI = images[random];
    return randomI;
}
function loadI(status) { //load images for correct/fail choice

    const correct = quiz[currentQ].correct; //get image

    if(status === 'win') {

        $("#game").html(`
        <p class="l-image">CORRECT!</p>
        <p class="l-image">The answer is <b>${correct}</b></p>
        <img src="${randomI(goodG)}"/>
        `); 

    } else {

        $("#game").html(`
        <p class="l-image">The answer is <b>${correct}</b></p>
        <p class="l-image">FAIL!</p>
        <img src="${randomI(badG)}"/>
        `); 
    }
}







/*for(var i=0; i<questions.length; i++){
    var response = window.prompt(questions[i].prompt);
    if(response === questions[i].answer){
        score++;
        alert("YEAH-HUH!");
    } else{
        alert("Nuh-uh!");
    }
}

alert("you got " + score + "/" + questions.length);*/