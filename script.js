// varible
const form = document.querySelector("form");
const todoCon = document.getElementById("todoCon");
const input = document.querySelector("form>input");



let todoList = getTodo();
updateTodo();

// function 
function addTodo() {
  const todoText = input.value.trim();
  
  if (todoText.length !== 0) {
    
    todoObj = {
      todo: todoText,
      completed: false
    }
    
    todoList.push(todoObj);
    updateTodo();
    saveTodo();
    input.value = "";
  }
}

function updateTodo() {
  todoCon.innerHTML = "";
  
  todoList.forEach((todo, idx) => {
    todoUI(todo, idx);
  })
}

function todoUI(todo, idx) {
  const todoEle = document.createElement("li");
  todoEle.classList.add("todo");
  todoEle.innerHTML = `
    <input type="checkbox" id="todo${idx}">
    <label for="todo${idx}" class="checkbox">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="1em"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
    </label>
    <label for="todo${idx}" class="todo-text">${todo.todo}</label>
    <button class="del-btn">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
    </button>
  `;
  todoCon.append(todoEle);
  
  
  const deleteBtn = todoEle.querySelector(".del-btn");
  
 deleteBtn.addEventListener("click", () => {
   todoList = todoList.filter((_, i) => i !== idx);
   saveTodo();
   updateTodo();
 })
 
  const todoInput = todoEle.querySelector("input");
  
  todoInput.addEventListener("change", () => {
    todoList[idx].completed = todoInput.checked;
    
    saveTodo();
    updateTodo();
  })
  
  todoInput.checked = todoList[idx].completed;
}

function saveTodo() {
  localStorage.setItem("todo", JSON.stringify(todoList));
}

function getTodo() {
  const todo = localStorage.getItem("todo");
  return JSON.parse(todo) || [];
}






// main logic
form.addEventListener("submit", e => {
  e.preventDefault();
  addTodo();
});

