const taskInput = document.querySelector(".task-input input")

taskInput.addEventListener("keyup", e =>{
    //..get the value of the input when user clicks enter 
    let userTask = taskInput.value.trim() //.. .trim prevents user from sending empty value 
    if(e.key == "Enter" && userTask){
        //..get localstorage 
        let todos = JSON.parse(localstorage.getItem("todo-list"))
        if(!todos){ //.. if todos isn't exist, pass an empty array to todos
            todos = []
        }
        taskInput.value = ""
        let taskInfo = {name: userTask, status: "pending"}
        todos.push(taskInfo) //.. adding new task to todos
        //..saving to todo-list name in local storage and convert todos to string
        localStorage.setItem("todo-list", JSON.stringify(todos))
    }
})