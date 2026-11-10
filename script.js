// Get HTML elements
const taskForm = document.getElementById("task-form");
const taskTitle = document.getElementById("task-title");
const taskPriority = document.getElementById("task-priority");
const taskList = document.getElementById("task-list");

// Load saved tasks from localStorage when the website opens
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Listen for form submission
taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = taskTitle.value.trim();
    const priority = taskPriority.value;

    if (title === "") {
        alert("Please enter a task title.");
        return;
    }

    const task = {
        title: title,
        priority: priority,
        completed: false
    };

    tasks.push(task);

    saveTasks();       // Save the new task
    displayTasks();

    taskForm.reset();
});

// Function to display tasks
function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {
        const taskItem = document.createElement("div");

        // Add the task and priority classes
        taskItem.classList.add("task-item", task.priority);

        if (task.completed) {
            taskItem.classList.add("completed");
        }

        const taskName = document.createElement("span");
        taskName.textContent = task.title;

        const priorityText = document.createElement("p");
        priorityText.textContent =
            "Priority: " + task.priority.charAt(0).toUpperCase()
            + task.priority.slice(1);

        // Create button container
        const taskActions = document.createElement("div");
        taskActions.classList.add("task-actions");

        // Complete / Undo button
        const completeButton = document.createElement("button");
        completeButton.classList.add("toggle-btn");
        completeButton.textContent = task.completed ? "Undo" : "Complete";

        completeButton.addEventListener("click", function() {
            task.completed = !task.completed;

            saveTasks();       // Save the completion change
            displayTasks();
        });

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            tasks.splice(index, 1);

            saveTasks();       // Save the deletion
            displayTasks();
        });

        taskActions.appendChild(completeButton);
        taskActions.appendChild(deleteButton);

        taskItem.appendChild(taskName);
        taskItem.appendChild(priorityText);
        taskItem.appendChild(taskActions);

        taskList.appendChild(taskItem);
    });
}

// Display saved tasks immediately when the website opens
displayTasks();