// getting all required elememts

const start_btn=document.querySelector(".start-btn button");
const info_box=document.querySelector(".info-box");
const exit_btn=info_box.querySelector(".buttons .quit");
const continue_btn=document.querySelector(".buttons .restart");
const quiz_box=document.querySelector(".quiz-box");
const timeCount=quiz_box.querySelector(".timer .timer-sec");
const timeLine=quiz_box.querySelector("header .time-line");
const timeOff=quiz_box.querySelector("header .time-text");
const option_list=document.querySelector(".option-list");


// If start Quiz button Clicked

start_btn.onclick = () =>{
    info_box.classList.add("activeInfo");  // Show the info box
}


// If exit btn button Clicked

exit_btn.onclick = () =>{
    info_box.classList.remove("activeInfo");  // exit info box
}

// If Continue btn button Clicked

continue_btn.onclick = () =>{
    info_box.classList.remove("activeInfo");  // continue info box
    quiz_box.classList.add("activeQuiz");  // show quiz box

    showQuestions(0);
    quesCounter(1);
    startTimer(15);
    startTimerLine(0)
}

let que_count=0;
let que_number=1;
let counter;
let counterLine;
let timeValue=15;
let widthValue=0;
let userScore=0;


const next_btn=quiz_box.querySelector(".next-btn");
const result_box=document.querySelector(".result-box");
const restart_quiz=result_box.querySelector(".buttons .restart");
const quit_quiz=result_box.querySelector(".buttons .quit");

restart_quiz.onclick = () =>{
    
        quiz_box.classList.add("activeQuiz");
        result_box.classList.remove("activeResult");

        let que_count=0;
        let que_number=1;
        let counter;
        let counterLine;
        let timeValue=15;
        let widthValue=0;
        let userScore=0;
        showQuestions(que_count);
        quesCounter(que_number);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display="none";
        //timeOff.textContent="Time Left";
}


quit_quiz.onclick=()=>{
    window.location.reload();
}


// If next Button Clicked
next_btn.onclick = () =>{
    if(que_count < questions.length - 1){
        que_count++;
        que_number++;
        showQuestions(que_count);
        quesCounter(que_number);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display="none";
        //timeOff.textContent="Time Left";
    }
    else{
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("Questions Completed");
        showResultBox();
    }
}

// getting questions and options fro array

function showQuestions(index){
    const que_text=document.querySelector(".que-text");
  //  const option_list=document.querySelector(".option-list");

    let que_tag='<span>'+questions[index].number + "." + questions[index].question+'</span';
    let option_tag='<div class="option">'+questions[index].options[0]+'<span></span></div>'
                    +'<div class="option">'+questions[index].options[1]+'<span></span></div>'
                    +'<div class="option">'+questions[index].options[2]+'<span></span></div>'
                    +'<div class="option">'+questions[index].options[3]+'<span></span></div>';
    que_text.innerHTML=que_tag;
    option_list.innerHTML=option_tag;
    const option=option_list.querySelectorAll(".option");
    for(let i=0;i<option.length;i++){
        option[i].setAttribute("onclick","optionSelected(this)");
    }
}


let tickIcon='<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon=' <div class="icon cross"><i class="fas fa-times"></i></div>';


function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns=answer.textContent;
    let correctAns=questions[que_count].answer;
    let allOptions=option_list.children.length;


    if(userAns==correctAns){
        userScore+=1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Answer is correct");
        answer.insertAdjacentHTML("beforeend",tickIcon);
    }
    else{
        answer.classList.add("wrong");
        console.log("Answer is wrong");
        answer.insertAdjacentHTML("beforeend",crossIcon);

        // if answers is incorrect then automatically selected the corret answer
        for(let i=0;i<allOptions;i++){
            if(option_list.children[i].textContent==correctAns){
                option_list.children[i].setAttribute("class","option correct");
                option_list.children[i].insertAdjacentHTML("beforeend",tickIcon);
            }
        }
    }

    // Once user select diabled all options
    for(let i=0;i<allOptions;i++){
        option_list.children[i].classList.add("disabled");
    }

    next_btn.style.display="block";
}


function showResultBox(){
    info_box.classList.remove("activeInfo");  // hide info box
    quiz_box.classList.remove("activeQuiz");  // hide quiz box
    result_box.classList.add("activeResult");  // result quiz box
    const scoreText=result_box.querySelector(".score-text");

    if(userScore>3){
        let scoreTag='<span>and congrats! You got <p>'+ userScore +'</p>out of<p>'+ questions.length +'</p></span>';
        scoreText.innerHTML=scoreTag;
    }

    else if(userScore>1){
        let scoreTag='<span>and nice, You got <p>'+userScore+'</p>out of<p>'+questions.length+'</p></span>';
        scoreText.innerHTML=scoreTag;
    }

    else{
        let scoreTag='<span>and sorry, You got only<p>'+userScore+'</p>out of<p>'+questions.length+'</p></span>';
        scoreText.innerHTML=scoreTag;
    }
}


function startTimer(time){
    counter=setInterval(timer,1000);
    function timer(){
        timeCount.textContent = time;
        time--;

        if(time<9){
            let addZero=timeCount.textContent;
            timeCount.textContent="0"+addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent="00";
         //   timeOff.textContent="Time Off";

            let correctAns=questions[que_count].answer;
            let allOptions=option_list.children.length;

            for(let i=0;i<allOptions;i++){
                if(option_list.children[i].textContent==correctAns){
                    option_list.children[i].setAttribute("class","option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend",tickIcon);
                }
            }

            for(let i=0;i<allOptions;i++){
                option_list.children[i].classList.add("disabled");
            }
        
            next_btn.style.display="block";

        }
    }
}



function startTimerLine(time){
    counterLine=setInterval(timer,29);
    function timer(){
       time+=1;
       timeLine.style.width=time+"px";
       if(time > 549){
            clearInterval(counterLine);
        }
    }
}





function quesCounter(index){
    const bottom_ques_counter=quiz_box.querySelector(".total-que");
    let totalQuesCountTag=  '<span><p>'+ index+'</p>of<p>'+questions.length +'</p>Questions</span>';
    bottom_ques_counter.innerHTML=totalQuesCountTag;
}

