// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const message = document.querySelector(".alert");
const filterOption = document.querySelector(".filter-todo");


// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

{/* <div class="todo">
    <li class="todo-item">Hey</li>
    <button class="complete-btn"><i class="fas fa-check"></i></button>
    <button class="trash-btn"><i class="fas fa-trash"></i></button>
    </div>
 */}


function addTodo(event) {
    event.preventDefault();
    console.log("HELlO");
    if (todoInput.value != "") {
        message.style.display = "none";
        // todo DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //<div class="todo">    </div>

        // Create LI Element

        const newTodo = document.createElement("li");
        newTodo.classList.add("todo-item");
        newTodo.innerText = todoInput.value;

        // <li class="todo-item">Hey</li>

        todoDiv.appendChild(newTodo);
        //  <div class="todo"> 
        // <li class="todo-item">Hey</li>  
        //  </div>
        saveLocalTodos(todoInput.value);
        const completedButton = document.createElement("button");
        completedButton.classList.add("complete-btn");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.classList.add("trash-btn");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    } else {
        message.style.display = "flex";
    }
    todoInput.value = "";
}



function deleteCheck(event) {
    const item = event.target;
    console.log(item);
    // delete todoDiv

    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function () {
            todo.remove();
        })
    }

    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }


}


function filterTodo(e) {
    const todos = todoList.childNodes;
    // console.log(todos);


    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;

            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "incompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }

    })
}

function saveLocalTodos(todo) {

    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}



function getTodos(e) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //<div class="todo">    </div>

        // Create LI Element

        const newTodo = document.createElement("li");
        newTodo.classList.add("todo-item");
        newTodo.innerText = todo;

        // <li class="todo-item">Hey</li>

        todoDiv.appendChild(newTodo);
        //  <div class="todo"> 
        // <li class="todo-item">Hey</li>  
        //  </div>
        const completedButton = document.createElement("button");
        completedButton.classList.add("complete-btn");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.classList.add("trash-btn");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        todoDiv.appendChild(trashButton);
        todoList.appendChild(todoDiv);
    })
}


function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    console.log(todo.children);
    const text = todo.children[0].innerText;
    todos.splice(todos.indexOf(text), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}
