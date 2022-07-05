const taskInput = document.querySelector(".task-input input")

taskInput.addEventListener("keyup", e =>{
    //..get the value of the input when user clicks enter 
    let userTask = taskInput.value.trim() //.. .trim prevents user from sending empty value 
    if(e.key == "Enter" && userTask){
        //..get localstorage 
        let todos = localstorage.getItem("todo-list")
        if(!todos){
            todos = []
        }
    }
})