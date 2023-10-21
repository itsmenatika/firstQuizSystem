window.addEventListener("DOMContentLoaded", ()=> {

    // config
    const questions = [
        {"name":"When did world war two start?", "right": "a", "a": "1939", "b": "1940", "c": "1936", "d":"1938"},
        {"name":"Which one came first? Chicken or egg?", "right": "b", "a": "Chicken", "b": "egg", "c": "dog", "d":"you"},
        {"name":"How much one stack in minecraft contains?", "right": "c", "a": "60", "b": "32", "c": "64", "d":"65"},
        {"name":"What year do we have?", "right": "a", "a": "2023", "b": "2020", "c": "2016", "d":"2000"}
    ];
    // format for one question
    // {name: "nameForYouQuestion", "right": "rightAnswer", "a": "aAnswer", "b": "bAnswer", "c": "cAnswer", "d": "dAnswer",}

    const rewardForRight = 1; // reward for every right chosen answer
    const rewardForWrong = 0; // reward for every wrong chosen answer
    const maxTime = 1; // minutes to complete the whole test

    // code


    // divs
    const upperDiv = document.getElementById("upper");
    const questionDiv = document.getElementById("question");
    const optionsDiv = document.getElementById("options");


    // for global scope
    let currentSec;
    let currentMinutes;

    let currentQuestion;
    let currentPoints;



    // function to generate upper div
    function generateUpper(){
        upperDiv.innerHTML = `<div id="blank"></div>
        <h2>Question no. 1</h2>
        <h3>${currentQuestion + 1}/${questions.length} Questions<br>
        ${currentMinutes > 10 ? currentMinutes :  "0" + currentMinutes}:${currentSec > 10 ? currentSec : "0" + currentSec} time left</h3>`;
    }

    // function to generate questions and answer information
    function generateInformation(){
        
        questionDiv.innerHTML = questions[currentQuestion].name;
        optionsDiv.innerHTML = `${"a" in questions[currentQuestion] ? `<button class="option" id="optionA">A) ${questions[currentQuestion].a}</button>` : ""}
        ${"b" in questions[currentQuestion] ? `<button class="option" id="optionB">B) ${questions[currentQuestion].b}</button>` : ""}
        ${"c" in questions[currentQuestion] ? `<button class="option" id="optionC">C) ${questions[currentQuestion].c}</button>` : ""}
        ${"d" in questions[currentQuestion] ? `<button class="option" id="optionD">D) ${questions[currentQuestion].d}</button>` : ""}
        `;

        if("a" in questions[currentQuestion])
        document.getElementById("optionA").addEventListener("click", () => {choose("a")}); 

        if("b" in questions[currentQuestion])
        document.getElementById("optionB").addEventListener("click", () => {choose("b")}); 
    
        if("c" in questions[currentQuestion])
        document.getElementById("optionC").addEventListener("click", () => {choose("c")}); 

        if("d" in questions[currentQuestion])
        document.getElementById("optionD").addEventListener("click", () => {choose("d")}); 
    }

    // function to react with which answer user has chosen
    function choose(option){
        if(option == questions[currentQuestion].right) currentPoints += rewardForRight;
        else currentPoints += rewardForWrong;
        nextQuestion();
    }
    
    // going to next Question
    function nextQuestion(){

        if(questions.length - 1 > currentQuestion){
            currentQuestion += 1;
            generateUpper();
            generateInformation();
        }
        else{
            gameFinish("finished");
        }
    }

    // view after game has finished
    function gameFinish(cause){
        clearInterval(idIn);
        upperDiv.innerHTML = '<h2 style="text-align:center;">Game Finished</h2>';
        if(cause == "finished"){
            questionDiv.innerHTML = "You have completed the whole exam!";
        }
        else {
            questionDiv.innerHTML = "Unfortunely you've run out of time!";
        }
        optionsDiv.innerHTML = `${currentQuestion + 1}/${questions.length} Questions COMPLETED<br>
        You've got ${currentPoints} of ${questions.length * rewardForRight} points with<br>
        ${currentMinutes > 10 ? currentMinutes :  "0" + currentMinutes}:${currentSec > 10 ? currentSec : "0" + currentSec} time left<br><br>
        <button onclick="newGame()" style="width:60%;height:3rem;margin: auto;">Click here to start new game</button>`;
    }


    // timer
    function actualizeTime(){
        console.log(currentMinutes + ":" + currentSec)
        if(currentSec <= 0){
            if(currentMinutes > 0){
                currentMinutes -= 1;
                currentSec += 60;
            }

        }
        currentSec -= 1;
        if(currentSec < 0) gameFinish("timerunout");
        else generateUpper();
    }


    let idIn; // for global scope
    function newGame(){
        currentSec = 0;
        currentMinutes = maxTime;
    
        currentQuestion = 0;
        currentPoints = 0;

        generateInformation();
        actualizeTime();
        idIn = setInterval(actualizeTime,1000)
    }
    newGame();
    
    document.newGame = newGame; // for global scope



});

