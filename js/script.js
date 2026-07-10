const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
let tasks = [];
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }
    const newTask = {
        text: taskText,
        completed: false
    };
    tasks.push(newTask);
    createTask(newTask);
    saveTasks();
    taskInput.value = "";
}
function createTask(task) {
   const li = document.createElement("li");
    const checkBtn = document.createElement("button");
    checkBtn.innerHTML = '<i class="fa-regular fa-circle"></i>';
    checkBtn.style.border = "none";
    checkBtn.style.background = "transparent";
    checkBtn.style.cursor = "pointer";
    checkBtn.style.fontSize = "18px";
    checkBtn.style.color = "#B58DB6";
    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.completed) {
        span.classList.add("completed");
        checkBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    }
    checkBtn.addEventListener("click", function () {
     task.completed = !task.completed;
      span.classList.toggle("completed");
        if (task.completed) {
            checkBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
        } else {
            checkBtn.innerHTML = '<i class="fa-regular fa-circle"></i>';
        }
        saveTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function () {
        li.remove();
        tasks = tasks.filter(t => t !== task);
        saveTasks();
    });
    li.appendChild(checkBtn);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

}
function saveTasks() {
   localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks() {
   const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
        tasks = savedTasks;
        tasks.forEach(function (task) {
            createTask(task);
        });
    }

}
loadTasks();