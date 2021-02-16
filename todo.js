const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    //cleanToDos: li.id(현재 저장)와 toDo.id(버튼 누른것)이 같지 않은 것만 저장함
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id); //둘의 형이 달라서 console.log로 확인 후 같은 형으로 맞춤
    });
    //toDos를 클린으로 바꿔주면 삭제 된 항목 빠진 새로운 array를 저장함.
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    span.innerText = text
    delBtn.innerText = "X";
    delBtn.addEventListener("click", deleteToDo);
    li.appendChild(delBtn);
    li.appendChild(span);
    toDoList.appendChild(li);
    li.id = newId;
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;

    paintToDo(currentValue);
    toDoInput.value="";

}
function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        })
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();
