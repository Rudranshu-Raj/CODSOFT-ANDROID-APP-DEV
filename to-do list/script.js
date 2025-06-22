//alert("✅ JS loaded");
//console.log("✅ JS is working");

document.querySelectorAll('input, select').forEach(el => {
    el.addEventListener('focus', () => {
        setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 300);
    });
});

document.addEventListener("DOMContentLoaded", ()=> {

    const storedTask = JSON.parse(localStorage.getItem('tasks'))

    if(storedTask){
        storedTask.forEach((task)=> tasks.push(task))
        updateTaskList();
        updateStats();
    }
})

document.getElementById('newTask').addEventListener('click', function(e){
    e.preventDefault();

    addTask();
})

let tasks = [];

const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('due-date');
    const priorityInput = document.getElementById('priority');

    const text = taskInput.value.trim();
    const dueDate = dueDateInput.value.trim();
    const priority = priorityInput.value.trim();

    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    const newTask = {
        text: text,
        dueDate: dueDate,
        priority: priority,
        completed: false
    };

    tasks.push(newTask);

    taskInput.value = "";
    dueDateInput.value = "";
    priorityInput.value = "medium";

    updateTaskList();
    updateStats();
    saveTasks();
};


const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStats();
    saveTasks();
}

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTasks();
}

const editTask = (index) => {
    const task = tasks[index];

    const taskInput = document.getElementById("taskInput");
    document.getElementById("due-date").value = task.dueDate;
    document.getElementById("priority").value = task.priority;


    taskInput.value = task.text;

    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTasks();
}

const updateStats = () => {
    const completedTask = tasks.filter(task=> task.completed).length;
    const totalTask = tasks.length;
    const progress = (completedTask/totalTask)* 100;

    const progressBar = document.getElementById('progress');

    progressBar.style.width = `${progress}%`;

    document.getElementById('numbers').innerText = `${completedTask}/${totalTask}`;

    if(tasks.length  && completedTask === totalTask){
        blastConfetti();
    }
}

const updateTaskList = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? "completed" : ""}">
                    <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
                    <div class="taskDetails">
                        <p class="taskTitle"><big>${task.text}</big></p>
                        <small class="dueDate">Due: ${task.dueDate || "None"}</small><br>
                        <small class="priority ${task.priority}">Priority: ${task.priority || "None"}</small>
                    </div>
                </div>
                <div class="icons">
                    <img src="Button/edit.png" alt="Edit task" onclick="editTask(${index})"/>
                    <img src="Button/bin.png" alt="Delete task" onclick="deleteTask(${index})"/>
                </div>
            </div>
        `;

        listItem.querySelector('.checkbox').addEventListener('change', () => toggleTaskComplete(index));
        taskList.appendChild(listItem);
    });
};




const blastConfetti = ()=> {
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}

