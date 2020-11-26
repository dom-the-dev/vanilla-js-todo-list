const addButton = document.getElementById("js-add");
const input = document.getElementById("js-input");
const todoList = document.getElementById("js-list-todo");
const doneList = document.getElementById("js-list-done");
let storedTodoItems = JSON.parse(window.localStorage.getItem("todo"));
let storedCheckedItems = JSON.parse(window.localStorage.getItem("done"));

addButton.addEventListener("click", addTodo);

// display saved elements from locale storage
if (storedTodoItems) {
    storedTodoItems.forEach(function (item) {
        addListElement(item.name, item.id, todoList);
    });
}
if (storedCheckedItems) {
    storedCheckedItems.forEach(function (item) {
        addListElement(item.name, item.id, doneList, true);
    });
}

// add todo-element function
function addTodo(e) {
    e.preventDefault();
    if (input.value !== "") {
        let todoListItems = document.querySelectorAll(".list-todo li");

        let lastId;
        if (todoListItems.length) {
            lastId =
                parseInt(
                    todoListItems[todoListItems.length - 1].getAttribute("data-index")
                ) + 1;
        } else {
            lastId = 0;
        }

        addListElement(input.value, lastId, todoList);
        saveToStorage(input.value, lastId, "todo");
        input.value = "";
    } else {
        input.classList.add("error");
    }
}

function addListElement(value, index, list, addButtons = false) {
    let listElement = createListElement(value, index, addButtons);
    listElement.setAttribute("data-index", index);
    list.appendChild(listElement);
}

function saveToStorage(item, index, storage) {
    let newStorage = [];
    storedTodoItems = JSON.parse(window.localStorage.getItem(storage));

    if (storedTodoItems) {
        newStorage = storedTodoItems;
    }

    newStorage.push({
        name: item,
        id: index,
    });
    window.localStorage.setItem(storage, JSON.stringify(newStorage));
}

function removeFromStorage(index) {
    let newStoredItems = JSON.parse(window.localStorage.getItem("todo"));
    let removeItem = newStoredItems.find(
        (item) => parseInt(item.id) === parseInt(index)
    );
    let removeIndex = newStoredItems.indexOf(removeItem);

    newStoredItems.splice(removeIndex, 1);
    window.localStorage.setItem("todo", JSON.stringify(newStoredItems));
}

function createListElement(title, index, done) {
    const text = document.createTextNode(title);
    const listElement = document.createElement("li");
    listElement.setAttribute("data-index", index);

    listElement.classList.add("listElement");
    listElement.appendChild(text);

    if (!done) {
        const buttonWrapper = document.createElement("div");
        buttonWrapper.classList.add("buttonWrapper");

        const doneButton = document.createElement("button");
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
    let listElement = this.parentElement.parentElement;
    let index = listElement.getAttribute("data-index");
    removeFromStorage(index);

    let buttons = listElement.querySelector(".buttonWrapper");
    listElement.removeChild(buttons);

    console.log('listElement, ', listElement)



    let lastId;
    if (doneList.length) {
        lastId =
            parseInt(
                doneList[doneList.length - 1].getAttribute("data-index")
            ) + 1;
    } else {
        lastId = 0;
    }


    saveToStorage(listElement.innerText, lastId, 'done')
    doneList.appendChild(listElement);
}

// function deleteTodo(e) {
//   e.preventDefault();
//   this.parentElement.parentElement.remove();
// }
