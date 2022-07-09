const taskInput = document.querySelector(".task-input input")
filters = document.querySelectorAll(".filters span")
taskBox = document.querySelector(".task-box")
clearTaskBtn = document.querySelector(".clear-btn")

let editId, isEditedTask = false 


//..get localstorage todo-list
let todos = JSON.parse(localStorage.getItem("todo-list"))


//..filtering the tasks 
filters.forEach(btn =>{
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active")
        btn.classList.add("active")
        showTodo(btn.id) //..update the todoList
    })
})

function showTodo(filter){
    let li = " "
    if(todos){
        todos.forEach((todo, id) => {
            //..isCompleted value will be checked if the todo status is completed
            let isCompleted = todo.status == "completed" ? "checked" : ""
            if(filter == todo.status || filter == "all"){
                 // console.log(id, todo) //..get data from localStorage
            li += `<li class="task">
            <label for="${id}">
                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                <p class="${isCompleted}">${todo.name}</p>
            </label>
            <div class="settings">
                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                <ul class="task-menu">
                    <li onclick='editTask(${id}, "${todo.name}")'><i class="uil uil-pen"></i>Edit</li>
                    <li onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Delete</li>
                </ul>
            </div>
        </li>`
            }
        })
    }
    //..if the list isn't empty show the values, else display span message
    taskBox.innerHTML = li || `<p>You don't any task </p>`
    
    
}

showTodo("all") //..show all list in the All filter sectiion

//..detecting the edited task
function showMenu(selectedTask){
    //..getting task menu div
    let taskMenu = selectedTask.parentElement.lastElementChild
    taskMenu.classList.add("show")
    document.addEventListener("click", e=>{
      //..removing show class from the task menu on the document click 
     if (e.target.tagName != "I" || e.target != selectedTask){
        taskMenu.classList.remove("show")
     }           
    })
}

function updateStatus(selectedTask){
    //..getting paragraph that contains task name
    let taskName = selectedTask.parentElement.lastElementChild
    if(selectedTask.checked){
        taskName.classList.add("checked")
        //..updating the sselected status to completed
        todos[selectedTask.id].status = "completed"
    } else {
        taskName.classList.remove("checked")
        //..updating the selected status to Pending
        todos[selectedTask.id].status = "pending"
    }
    localStorage.setItem("todo-list", JSON.stringify(todos))
}
//..edit note button function
function editTask(taskId, taskName){
    editId = taskId
    isEditedTask = true
    taskInput.value = taskName
    taskInput.focus()
    taskInput.classList.add("active")
}

//.. delete note button function
function deleteTask(deleteId, filter){
    //..removing selectedTask task array/todos and localStorage
    isEditedTask  = false
    todos.splice(deleteId, 1)
    localStorage.setItem("todo-list", JSON.stringify(todos))
    showTodo("all")
}

//..clear all tasks
clearTaskBtn.addEventListener("click",() =>{
    isEditedTask = false
    //..remove all items in the todos array 
    todos.splice(0, todos.length)
    localStorage.setItem("todo-list", JSON.stringify(todos))
    showTodo("all")
})

taskInput.addEventListener("keyup", e => {
     //..get the value of the input when user clicks enter 
    let userTask = taskInput.value.trim(); //.. .trim prevents user from sending empty value 
    if(e.key == "Enter" && userTask) {
        if(!isEditedTask) {
            todos = !todos ? [] : todos //.. if todos isn't exist, pass an empty array to todos
            let taskInfo = {name: userTask, status: "pending"}
            todos.push(taskInfo) //.. adding new task to todos
        } else {
            isEditedTask = false
            todos[editId].name = userTask
        }
        taskInput.value = ""
        //..saving to todo-list name in local storage and convert todos to string
        localStorage.setItem("todo-list", JSON.stringify(todos))
        showTodo(document.querySelector("span.active").id)
    }
})