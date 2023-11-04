const addTaskButton = document.getElementById("addTask");
const taskInput = document.querySelector(".input-container input");
const taskList = document.getElementById("taskList");
const addButtonContainer = document.querySelector(".input-container button");
const clearInputButton = document.querySelector(".fa-regular.fa-circle-xmark");
const inputGroup = document.querySelector(".input-group");

addTaskButton.addEventListener("click", function () {
    if (inputGroup.style.display === "none") {
        inputGroup.style.display = "block";
    } else {
        addTask();
    }
});

taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        if (inputGroup.style.display === "none") {
            inputGroup.style.display = "block";
        } else {
            addTask();
        }
    }
});

clearInputButton.addEventListener("click", function () {
    taskInput.value = "";
});
taskList.addEventListener("click", function (event) {
    const target = event.target;

    if (target.classList.contains("fa-regular") && target.classList.contains("fa-circle-xmark")) {
        removeTask(target.closest("li"));
    } else if (target.tagName === "LI") {
        toggleTaskCompletion(target);
    }
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        addTaskToList(taskText);
        taskInput.value = "";
        taskContainer.style.display = "block";
    }
}

function addTaskToList(taskText) {
    const listItem = document.createElement("li");
    listItem.className = "task-item"; 
    listItem.innerHTML = `
        <span class="task-text">${taskText}</span>
        <i class="fa-regular fa-circle-xmark"></i> 
    `;
    taskList.appendChild(listItem);
}



function clearInput() {
    taskInput.value = "";
}

function toggleTaskCompletion(taskElement) {
    taskElement.classList.toggle("completed");
}

function removeTask(taskElement) {
    taskList.removeChild(taskElement);
}


let ascendingOrder = true; 

const sortIcon = document.getElementById("sortIcon");


sortIcon.addEventListener("click", function () {
    sortTasks(ascendingOrder); 
    ascendingOrder = !ascendingOrder; 

    if (ascendingOrder) {
        sortIcon.classList.remove("fa-arrow-down-short-wide"); 
        sortIcon.classList.add("fa-arrow-up-wide-short"); 
    } else {
        sortIcon.classList.remove("fa-arrow-up-wide-short"); 
        sortIcon.classList.add("fa-arrow-down-short-wide"); 
    }
});


function sortTasks(ascending) {
    const tasks = Array.from(taskList.children); 
    tasks.sort(function (a, b) {
        const textA = a.querySelector(".task-text").textContent.toLowerCase();
        const textB = b.querySelector(".task-text").textContent.toLowerCase();

        if (ascending) {
            return textA.localeCompare(textB);
        } else {
            return textB.localeCompare(textA);
        }
    });

    taskList.innerHTML = "";
    tasks.forEach(function (task) {
        taskList.appendChild(task);
    });
}






