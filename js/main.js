import ListToDo from "./listToDo.js";
import toDo from "./toDo.js";

const listToDo = new ListToDo();

const getEle = (id) => {
    return document.getElementById(id);
}

let list = [];
const fetchData = () => {
    listToDo.callApi("todo", "GET", null)
        .then((res) => {
            console.log(res);
            list = res.data;
            renderToDo(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
}

fetchData();

const renderToDo = (arr) => {
    let todoHTML = "";
    let completeHTML = "";
    arr.forEach((todo) => {
        if (todo.completed === true) {
            completeHTML += `<li id="${todo.id}">
        <span>
        ${todo.nameTask}
        </span>
        <div class="buttons">
            <button class="fa fa-trash-alt remove" onclick="deleteToDo(${todo.id})"></button>
            <button class="bi bi-check-circle-fill completeD" onclick="changeStatus(${todo.id}, false)"></button>
        </div>
        </li>
        `
        } else {
            todoHTML += `
        <li id="${todo.id}">${todo.nameTask}
            <div class="buttons">
                <button class="fa fa-trash-alt remove" onclick="deleteToDo(${todo.id})"></button>
                <button class="bi bi-check-circle complete" onclick="changeStatus(${todo.id}, true)"></button>
            </div>
        </li>
        `
        }

    }, "");
    getEle("todo").innerHTML = todoHTML;
    getEle("completed").innerHTML = completeHTML;
}

getEle("addItem").addEventListener("click", () => {
    addToDo();
});

const addToDo = () => {
    const _nameTask = getEle("newTask").value;
    const _completed = false;

    const task = new toDo("", _nameTask, _completed);

    listToDo.callApi("todo", "POST", task)
        .then((res) => {
            console.log(res.data);
            fetchData();
        })
        .catch((error) => {
            console.log(error);
        })
}


const changeStatus = (id, isComplete) => {
    const _nameTask = getEle(`${todo.id}`).value;
    const _completed = isComplete;

    const task = new toDo(id, _nameTask, _completed);

    listToDo.callApi(`todo/${id}`, "PUT", task)
        .then((res) => {
            fetchData();
        })
        .catch((error) => {
            console.log(error);
        })
}
window.changeStatus = changeStatus;

const deleteToDo = (id) => {
    listToDo.callApi(`todo/${id}`, "DELETE", null)
        .then((res) => {
            fetchData();
        })
        .catch((error) => {
            console.log(error);
        })
}
window.deleteToDo = deleteToDo;

getEle("two").addEventListener("click", () => {
    list.sort(function(a, b){
        if(a.nameTask < b.nameTask) { return -1; }
        if(a.nameTask > b.nameTask) { return 1; }
        return 0;
    })
    renderToDo(list);
});

getEle("three").addEventListener("click", () => {
    list.sort(function(a, b){
        if(a.nameTask < b.nameTask) { return 1; }
        if(a.nameTask > b.nameTask) { return -1; }
        return 0;
    })
    renderToDo(list);
});
