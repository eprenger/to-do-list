//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Functions
function addTodo(event) {
  //prevent form from submitting
  event.preventDefault();

  //todo <div>
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //add todo to local storage
  // saveLocalTodo(todo.value);

  //completed (check-mark) button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("completed-button");
  todoDiv.appendChild(completedButton);

  //create delete button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-button");
  todoDiv.appendChild(trashButton);

  newTodo.innerText = todoInput.value.trim();
  if (!newTodo.innerText) {
    alert("Add a task");
    return;
  }

  //append to list
  todoList.appendChild(todoDiv);

  //clear todo input value
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  //delete todo
  if (item.classList[0] === "trash-button") {
    const todo = item.parentElement;
    //animation
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //check mark
  if (item.classList[0] === "completed-button") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todo = todoList.childNodes;
  todo.forEach(function (todo) {
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

      case "finished":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

/* function saveLocalTodo(todo) {
  //check-- is there already something here?
  let todo;
  if (localStorage.getItem("todo") === null) {
    todo = [];
  } else {
    todo = JSON.parse(localStorage.getItem("todo"));
  }
  todo.push(todo);
  localStorage.setItem("todo", JSON.stringify(todo));
} */
