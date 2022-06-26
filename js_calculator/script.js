const calculator = document.querySelector(".calculator")
const keys = document.querySelector("calculator__keys")
let header = document.querySelector("h1");
const display = document.querySelector(".calculator__display")

header.innerText = "This is awesome"


keys.addEventListener('click', function(e){

    if(e.target.matches('button')){
        const key = e.target
        const action = key.dataset.action
        const keyContext = key.textContent
        const displayedNum = display.textContent
    
        //...
        if(!action){
            if(displayedNum === '0'){
                display.textContent = keyContext
            }
        }
    }
})



