// frontend/app.js

// Get references to HTML elements
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');

// Define a function to render tasks
function renderTasks() {
  taskList.innerHTML = '';
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
      <span>${task.title}</span>
      <button class="edit-button" data-index="${index}">Edit</button>
      <button class="delete-button" data-index="${index}">Delete</button>
    `;
    taskList.appendChild(taskItem);
  });
}

// Add a new task
addTaskButton.addEventListener('click', () => {
  const taskTitle = taskInput.value;
  if (taskTitle) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ title: taskTitle });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    renderTasks();
  }
});

// Edit a task
taskList.addEventListener('click', (event) => {
  if (event.target.classList.contains('edit-button')) {
    const index = event.target.getAttribute('data-index');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTitle = prompt('Edit Task:', tasks[index].title);
    if (updatedTitle) {
      tasks[index].title = updatedTitle;
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    }
  }
});

// Delete a task
taskList.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-button')) {
    const index = event.target.getAttribute('data-index');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
});

// Initial rendering of tasks
renderTasks();
