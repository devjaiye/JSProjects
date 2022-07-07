const taskInput = document.querySelector(".task-input input")

//..get localstorage todo-list
let todos = JSON.parse(localStorage.getItem("todo-list"))

function showTodo(){
    let li = " "
    todos.forEach((todo, id) => {
        // console.log(id, todo) //..get data from localStorage
    li += ``
    })
}

showTodo()

taskInput.addEventListener("keyup", e =>{
    //..get the value of the input when user clicks enter 
    let userTask = taskInput.value.trim() //.. .trim prevents user from sending empty value 
    if(e.key == "Enter" && userTask){
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