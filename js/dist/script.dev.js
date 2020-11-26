"use strict";

var addButton = document.getElementById("js-add");
var input = document.getElementById("js-input");
var todoList = document.getElementById("js-list-todo");
var doneList = document.getElementById("js-list-done");
var storedTodoItems = JSON.parse(window.localStorage.getItem("todo"));
var storedCheckedItems = JSON.parse(window.localStorage.getItem("done"));
addButton.addEventListener("click", addTodo); // display saved elements from locale storage

if (storedTodoItems) {
  storedTodoItems.forEach(function (item) {
    addListElement(item.name, item.id);
  });
} // add todo-element function


function addTodo(e) {
  e.preventDefault();

  if (input.value !== "") {
    var _todoList = document.querySelectorAll(".list-todo li");

    var lastId;

    if (_todoList.length) {
      lastId = parseInt(_todoList[_todoList.length - 1].getAttribute("data-index")) + 1;
    } else {
      lastId = 0;
    }

    addListElement(input.value, lastId);
    saveToStorage(input.value, lastId);
    input.value = "";
  } else {
    input.classList.add("error");
  }
}

function addListElement(value, index) {
  var listElement = createListElement(value, index, false);
  listElement.setAttribute("data-index", index);
  todoList.appendChild(listElement);
}

function saveToStorage(item, index) {
  var newStorage = [];
  storedTodoItems = JSON.parse(window.localStorage.getItem("todo"));

  if (storedTodoItems) {
    newStorage = storedTodoItems;
  }

  newStorage.push({
    name: item,
    id: index
  });
  window.localStorage.setItem("todo", JSON.stringify(newStorage));
}

function removeFromStorage(index) {
  var newStoredItems = JSON.parse(window.localStorage.getItem("todo"));
  var removeItem = newStoredItems.find(function (item) {
    return parseInt(item.id) === parseInt(index);
  });
  var removeIndex = newStoredItems.indexOf(removeItem);
  newStoredItems.splice(removeIndex, 1);
  window.localStorage.setItem("todo", JSON.stringify(newStoredItems));
}

function createListElement(title, index, done) {
  var text = document.createTextNode(title);
  var listElement = document.createElement("li");
  listElement.setAttribute("data-index", index);
  listElement.classList.add("listElement");
  listElement.appendChild(text);

  if (!done) {
    var buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add("buttonWrapper");
    var doneButton = document.createElement("button");
    doneButton.innerText = "done";
    doneButton.classList.add = "js-done";
    doneButton.addEventListener("click", checkTodo);
    buttonWrapper.appendChild(doneButton);
    listElement.appendChild(buttonWrapper);
  }

  return listElement;
}

function checkTodo(e) {
  e.preventDefault();
  var listElement = this.parentElement.parentElement;
  var index = listElement.getAttribute("data-index");
  removeFromStorage(index);
  var buttons = listElement.querySelector(".buttonWrapper");
  listElement.removeChild(buttons);
  doneList.appendChild(listElement);
} // function deleteTodo(e) {
//   e.preventDefault();
//   this.parentElement.parentElement.remove();
// }