const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const completedTasks = document.getElementById("completedTasks");
const totalTasks = document.getElementById("totalTasks");
const progress = document.getElementById("progress");
const filterButtons = document.querySelectorAll(".filter-btn");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");
const emptyState = document.getElementById("emptyState");
let currentFilter = "all";
let tasks = [];
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
filterButtons.forEach(function(button){
   button.addEventListener("click",function(){
      filterButtons.forEach(btn=>{
            btn.classList.remove("active");
        });
        button.classList.add("active");
        currentFilter = button.dataset.filter;
        filterTasks();
    });
});
clearCompletedBtn.addEventListener("click", clearCompleted);

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
    updateProgress();
    filterTasks();
    updateEmptyState();
}
function updateProgress() {
   const total = tasks.length;
   const completed = tasks.filter(task => task.completed).length;
   totalTasks.textContent = total;
    completedTasks.textContent = completed;
    if (total === 0) {
        progress.style.width = "0%";
    }
    else {
        progress.style.width = (completed / total) * 100 + "%";
    }
}
function updateEmptyState(){
   if(tasks.length===0){
        emptyState.style.display="block";
        taskList.style.display="none";
    }
    else{
        emptyState.style.display="none";
        taskList.style.display="block";
    }
}
function clearCompleted() {
   tasks = tasks.filter(task => !task.completed);
   taskList.innerHTML = "";
   tasks.forEach(function(task){
        createTask(task);
    });
   saveTasks();
}
function filterTasks(){
   const taskItems = taskList.querySelectorAll("li");
    taskItems.forEach(function(li,index){
        const task = tasks[index];
        if(currentFilter==="all"){
            li.style.display="flex";
        }
        else if(currentFilter==="active"){
        li.style.display = task.completed ? "none" : "flex";
        }
         else if(currentFilter==="completed"){
          li.style.display = task.completed ? "flex" : "none";
      }
    });
}
function loadTasks() {
   const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
        tasks = savedTasks;
        tasks.forEach(function (task) {
            createTask(task);
        });
        updateProgress();
        updateEmptyState();
    }
}
loadTasks();
const today = new Date();
document.getElementById("date").textContent =
today.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
});