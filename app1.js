// Define UI vars

const forms  = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");  

// Load all event Kisteners
loadAllEventListeners();
 
function loadAllEventListeners(){

// DOM Load Event 
document.addEventListener('DOMContentLoaded', getTasks);

//Add task Event 
  forms.addEventListener('submit',addTask);

// delete task Event
    taskList.addEventListener('mouseover',removeTask);
// implementing clear btn 
    clearBtn.addEventListener('click',clearTask);

    filter.addEventListener('keyup',filterTask)

}

function getTasks(){

  let tasks;
  if(localStorage.getItem('tasks')=== null){
    tasks = [];
 }else{
     tasks = JSON.parse(localStorage.getItem('tasks'))
 }

 tasks.forEach(function(task){    
  // make Li
  const list = document.createElement('li');
  list.className = 'collection-item'; 

//make text
list.appendChild(document.createTextNode(task));

// create link
const link = document.createElement('a');
//Putting Class in link 
link.className = "delete-item secondary-content";
// Giving inner Html values
link.innerHTML = '<i class="fa fa-remove"></i>'
// append link to list
list.appendChild(link);

// append list to ul
taskList.appendChild(list);


 })

}



function addTask(e){
 
if(taskInput.value==''){
        alert("Add a Task");
      }
else{

// make Li
  const list = document.createElement('li');
  list.className = 'collection-item'; 

//make text
list.appendChild(document.createTextNode(taskInput.value));

// create link
const link = document.createElement('a');
//Putting Class in link 
link.className = "delete-item secondary-content";
// Giving inner Html values
link.innerHTML = '<i class="fa fa-remove"></i>'
// append link to list
list.appendChild(link);

// append list to ul
taskList.appendChild(list);

// store in LS 
storeTaskInLocalStorage(taskInput.value);


// clear input
taskInput.value = "";

e.preventDefault();
  }
}
// store task 
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks')=== null){
     tasks = [];
  }else{
      tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.push(task);
  localStorage.setItem('tasks',JSON.stringify(tasks));
}



function removeTask(e){
    let li = document.querySelectorAll('i');
    li.forEach(function(li){    
      li.addEventListener("click",function(){
        li.parentElement.parentElement.remove();
        // }
        // remove from LS 
        removeTaskFromLocalStorage(li.parentElement.parentElement);
      })
    });        
}

function removeTaskFromLocalStorage(taskItem){
      // console.log(taskItem) 
      let tasks;
      if(localStorage.getItem('tasks')=== null){
         tasks = [];
      }else{
          tasks = JSON.parse(localStorage.getItem('tasks'))
      }

      tasks.forEach(function(task, index){
          if(taskItem.textContent === task){
              tasks.splice(index, 1);
          }
      });

      localStorage.setItem('tasks', JSON.stringify(tasks));
    
}

function clearTask(){
    // taskList.innerHTML = " ";  
    while(taskList.firstChild){
      console.log(taskList.removeChild(taskList.firstChild));
    }
    // Clear from LS 
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
  localStorage.clear();
}

function filterTask(e){

    const text = e.target.value.toLowerCase(); 
    document.querySelectorAll(".collection-item").forEach(function(task){
            const item = task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) != -1 ) {
                  task.style.display = 'block';
            } else {
              task.style.display = 'none';
            }
    });
}


