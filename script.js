const addButton = document.getElementById("js-add");
const input = document.getElementById("js-input");
const listToDo = document.getElementById("js-list-todo");
const listDone = document.getElementById("js-list-done");
let storedTodoItems = JSON.parse(window.localStorage.getItem("todo"));
let storedCheckedItems = JSON.parse(window.localStorage.getItem("done"));


class ToDoList {
	constructor(addButton, todoItems, checkedItems, listToDo, listDone) {
		this.todoItems = todoItems;
		this.checkedItems = checkedItems;
		this.listTodo = listToDo;
		this.listDone = listDone;
		this.addButton = addButton;
	}

	init() {
		let _this = this;
		this.addButton.addEventListener("click", (e) => this.addToDo(e));

		if (_this.todoItems) {
			_this.todoItems.forEach(function (item) {
				_this.addListElement(item.name, item.id, _this.listTodo, true);
			});
		}

		if (_this.checkedItems) {
			_this.checkedItems.forEach(function (item) {
				_this.addListElement(item.name, item.id, _this.listDone, false);
			});
		}
	}


	addListElement(name, id, list, witButtons) {
		let listElement = this.createListElement(name, id, witButtons)
		listElement.setAttribute("data-index", id);
		list.appendChild(listElement);
	}


	addToDo(e) {
		e.preventDefault();

		if (input.value !== "") {
			let todoListItems = this.listTodo.querySelectorAll("li");

			let lastId;
			if (todoListItems.length) {
				lastId =
					parseInt(
						todoListItems[todoListItems.length - 1].getAttribute("data-index")
					) + 1;
			} else {
				lastId = 0;
			}

			this.addListElement(input.value, lastId, this.listTodo, true);
			this.addToLocalStorage(input.value, lastId, "todo");

			input.value = "";

		} else {
			input.classList.add("error");
		}
	}

	checkItem(e, elem) {
		e.preventDefault();
		let listElement = elem.parentElement.parentElement;

		let index = listElement.getAttribute("data-index");
		this.removeFromLocalStorage(index);

		let buttons = listElement.querySelector(".buttonWrapper");
		listElement.removeChild(buttons);

		let lastId;
		if (this.listDone.length) {
			lastId =
				parseInt(
					doneList[doneList.length - 1].getAttribute("data-index")
				) + 1;
		} else {
			lastId = 0;
		}


		this.addToLocalStorage(listElement.innerText, lastId, 'done')
		this.listDone.appendChild(listElement);
	}

	removeFromLocalStorage(index) {
		let newStoredItems = JSON.parse(window.localStorage.getItem("todo"));
		let removeItem = newStoredItems.find(
			(item) => parseInt(item.id) === parseInt(index)
		);
		let removeIndex = newStoredItems.indexOf(removeItem);

		newStoredItems.splice(removeIndex, 1);
		window.localStorage.setItem("todo", JSON.stringify(newStoredItems));
	}

	addToLocalStorage(item, index, storage) {
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

	createListElement(title, index, withButtons) {
		const text = document.createTextNode(title);
		const listElement = document.createElement("li");
		listElement.setAttribute("data-index", index);

		listElement.classList.add("listElement");
		listElement.appendChild(text);

		if (withButtons) {
			const buttonWrapper = document.createElement("div");
			buttonWrapper.classList.add("buttonWrapper");

			const doneButton = document.createElement("button");
			doneButton.innerText = "done";
			console.log(doneButton)
			doneButton.classList.add("button");
			doneButton.addEventListener("click", (e) => {
				this.checkItem(e, doneButton)
			});

			buttonWrapper.appendChild(doneButton);

			listElement.appendChild(buttonWrapper);
		}

		return listElement;
	}
}

let myToDoList = new ToDoList(addButton, storedTodoItems, storedCheckedItems, listToDo, listDone);

myToDoList.init();


