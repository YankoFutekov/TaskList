//Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all events listeners
loadEventListeners();

//Load all events listeners
function loadEventListeners() {
//DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks);
//Add task event
  form.addEventListener('submit', addTask);
//Remove task event
  taskList.addEventListener('click', removeTask);
//Clear task event
  clearBtn.addEventListener('click', clearTasks);
//Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

//Get Tasks from DOM LS
  function getTasks(){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
      //Create li element
      const li = document.createElement('li');
      //Add a class
      li.className = 'collection-item';
      //Create a text node and append to the li
      li.appendChild(document.createTextNode(task));
      //Create a new link element
      const link = document.createElement('a');
      //Add a class
      link.className = 'delete-item secondary-content';
      //Add icon html
      link.innerHTML = '<i class="fa fa-remove"></i>';
      //Append the link to the li
      li.appendChild(link);
      //Append the li to the ul
      taskList.appendChild(li);
    });
  }

//Add Task
function addTask(e) {
  if(taskInput.value === ''){
    alert('Add a task');
  }
//Create li element
  const li = document.createElement('li');
//Add a class
  li.className = 'collection-item';
//Create a text node and append to the li
  li.appendChild(document.createTextNode(taskInput.value));
//Create a new link element
  const link = document.createElement('a');
//Add a class
  link.className = 'delete-item secondary-content';
//Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
//Append the link to the li
  li.appendChild(link);
//Append the li to the ul
  taskList.appendChild(li);

//Store in local storage (LS)
  storeTaskInLocalStorage(taskInput.value);

//Clear input
  taskInput.value = '';
  e.preventDefault();
}
//Store Task
  function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    }else{
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

//Remove Task
  function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
      if(confirm('Are You Sure ?')){
        e.target.parentElement.parentElement.remove(); 

        //Remove from LS
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
      }      
    }
  }
//Remove from LS
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear Task
  function clearTasks(){
    //taskList.innerHTML = '';
//Faster way
    while(taskList.firstChild){
      taskList.removeChild(taskList.firstChild);
    }
//Clear Tasks from LS
    clearTasksFromLocalStorage();   
  }
//Clear Tasks from LS
  function clearTasksFromLocalStorage(){
    localStorage.clear();
  }
//Filter Task
  function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
      const item = task.firstChild.textContent;
      if(item.toLocaleLowerCase().indexOf(text) != -1){
        task.style.display = 'block';
      }else{
        task.style.display = 'none';
      }
    });
  }  
