const addButton = document.getElementById("js-add");
const input = document.getElementById("js-input");
const todoList = document.getElementById("js-list-todo");
const doneList = document.getElementById("js-list-done");

addButton.addEventListener("click", addTodo);

function addTodo(e) {
  e.preventDefault();

  if (input.value !== "") {
    let listElement = createListElement(input.value);
    todoList.appendChild(listElement);
    input.value = "";
  } else {
    input.classList.add("error");
  }
}

function createListElement(title) {
  const text = document.createTextNode(title);
  const listElement = document.createElement("li");

  listElement.classList.add("listElement");
  listElement.appendChild(text);

  const buttonWrapper = document.createElement("div");
  buttonWrapper.classList.add("buttonWrapper");

  const doneButton = document.createElement("button");
  doneButton.innerText = "done";
  doneButton.classList.add = "js-done";
  doneButton.addEventListener("click", finishTodo);

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "delete";
  deleteButton.classList.add = "js-delete";
  deleteButton.addEventListener("click", deleteTodo);

  buttonWrapper.appendChild(doneButton);
  buttonWrapper.appendChild(deleteButton);

  listElement.appendChild(buttonWrapper);

  return listElement;
}

function finishTodo(e) {
  e.preventDefault();
  let listElement = this.parentElement.parentElement;
  listElement.removeChild(listElement.querySelector(".buttonWrapper"));
  doneList.appendChild(listElement);
}

function deleteTodo(e) {
  e.preventDefault();
  this.parentElement.parentElement.remove();
}
