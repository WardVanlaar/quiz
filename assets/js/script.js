//code adapted from https://www.codingnepalweb.com/quiz-app-with-timer-javascript/

//selecting all required elements
const hs_btn = document.querySelector("#hs_btn");
const start_btn = document.querySelector("#start_btn");
const submit_btn = document.querySelector("#submit_btn");
const gb_btn = document.querySelector("#gb_btn");
const chs_btn = document.querySelector("#chs_btn");
const info_box = document.querySelector(".info_box")
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const hs_box = document.querySelector(".hs_box");
const option_list = document.querySelector(".option_list");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const timeCounter = document.querySelector(".timer_sec");
const final_results = document.querySelector("#final_results");
const quizTimeCounter = document.querySelector(".timer_sec_quiz");
const NO_OF_HIGH_SCORES = 10;

let time = 75;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let widthValue = 0;

// if startQuiz button clicked
start_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide intro
    quiz_box.classList.add("activeQuiz"); //show quiz box
    startTimer(75); //calling startTimer function
    showQuestions(0); //calling showQestions function
    queCounter(1);
    
}

// getting questions and options from array
function showQuestions(index){
    const que_text = document.querySelector(".que_text");
    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");
    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

//if user clicked on option
function optionSelected(answer){
    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[que_count].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items
    
    if (userAns == correcAns && (que_numb <= questions.length-1) && time>0) { //if user selected option is equal to array's correct answer
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
    } else if (userAns != correcAns && (que_numb <= questions.length-1) && time>0) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        timerPen();
        console.log(time);
    } else if (userAns == correcAns && que_numb == questions.length && time>0) {
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        console.log(time);
        showResult();
    } else if (userAns != correcAns && que_numb == questions.length && time>0) {
        showQuestions(que_count);
        queCounter(que_numb);
        timerPen();
        clearInterval(counter);
        console.log(time);
        showResult();
    }
}

function showResult(){
    quiz_box.classList.remove("activeQuiz"); 
    result_box.classList.add("activeResult");
    const scoreText1 = result_box.querySelector("#user_score1");
    const scoreText2 = result_box.querySelector("#user_score2");
    time++;
    scoreText1.innerHTML = time;
    scoreText2.innerHTML = time;
}

function hiScoreHandler(event) {
    var initialsInput = document.querySelector("#initials").value;
    if (!initialsInput) {
        alert("You need to enter your initials!");
        return false;
    }

    var resultsDataObj = {
        score: time,
        name: initialsInput,
    };
    
    console.log(resultsDataObj);

    final_results.textContent = `1: ${resultsDataObj.name} - ${resultsDataObj.score}`;

    result_box.classList.remove("activeResult");
    hs_box.classList.add("activeHs");

    // var score = 0
    // var highscore = localStorage.getItem();
    // console.log(highscore);
    
    // if (highscore !== null) {
    //    if (score > highscore) {
    //       localStorage.setItem("highscore", JSON.stringify(resultsDataObj));
    //    }
    // } else {
    //    localStorage.setItem("highscore", JSON.stringify(resultsDataObj));
    // }
        
}

submit_btn.addEventListener("click", hiScoreHandler);

function goBack(event) {
    location.reload();
}

gb_btn.addEventListener("click", goBack);

function clear(event) {
    localStorage.clear();
    final_results.textContent = ` `;
}

chs_btn.addEventListener("click", clear);

// function viewHiS(event) {
//     info_box.classList.remove("activeInfo");
//     quiz_box.classList.remove("activeQuiz"); 
//     result_box.classList.remove("activeResult");
//     hs_box.classList.add("activeHs");
// }

// hs_btn.addEventListener("click", viewHis);


//timer function
function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        console.log(quizTimeCounter, time);
        quizTimeCounter.innerHTML = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if(time < 0) {
            clearInterval(counter);
        }
    }
}

//penalize function to subtract 10 seconds when wrong answer selected
function timerPen() {
    clearInterval(counter);
    time = quizTimeCounter.textContent - 10;
    quizTimeCounter.textContent = time;
    time--;
    startTimer(time);
}

//keeping track of question numbers
function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
}
