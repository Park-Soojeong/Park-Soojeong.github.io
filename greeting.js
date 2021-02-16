const form = document.querySelector(".js-form"),
    input = document.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text){
    localStorage.setItem(USER_LS, text);   
}

 //input에 작성 후 enter누르면 event로 submit되어 다른 곳에 보내고 페이지를 새로고침하게 된다.
function handleSubmit(event){
    event.preventDefault(); //내용을 다른곳으로 보내는 걸 막는 함수(prevent=막다)
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadNmae(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        //she is not
        askForName();
    }else{
        //she is
        paintGreeting(currentUser);
    }
}

function init(){
    loadNmae();
}

init();