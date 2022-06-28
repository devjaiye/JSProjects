
const selectMenu = document.querySelectorAll("select") //...communicating with select from HTML
//..check if it's connected console.log(selectMenu)
const getCurrentTime = document.querySelector("h1") //..selects the h1 element in the HTML file 
const setAlarmBtn = document.querySelector("button")
const content = document.querySelector(".content")
let alarmTime, isAlarmSet = false //...enable and disable alarm 

let color = 

ringtone = new Audio("./files/ringtone.mp3")


//..add items to the "select tag. here we are setting the Hour to be present in the clock which is 12"
for(let i = 12; i > 0; i--){
    //..if the number is less than 10, add "0" before it
    i = i < 10 ? "0" + i : i  //..console.log(i)

    //..adding options in the HTML select tag. index[0] refers to the first option which is "Hour"
    let option = `<option value="${i}">${i}</option>`
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option)
}

//..setting the value of minutes 

for(let i = 59; i >= 0; i--){
    i = i < 10 ? "0" + i : i
    let option = `<option value="${i}">${i}</option>`
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option)
}

//..if i == 1, set the ampm value to "AM" else set to PM
for(let i = 2; i > 0; i--){
    let ampm = i == 1 ? "AM" : "PM" //..If i == 1, the ampm value will be set to AM else PM
    let option = `<option value="${ampm}">${ampm}</option>`
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option)
}

//..Display current time 
setInterval(() =>{
    let date = new Date()
    let h = date.getHours()
    let m = date.getMinutes()
    let s = date.getSeconds()
    ampm = "AM"

    if(h >= 12){
        h = h - 12
        ampm = "PM"
    }

    //..if hour value is 0, set this value to 12
    h = h == 0 ? h = 12 : h;
    //..adding "0" before hr, min, and sec if the value is less than 10 
    h = h < 10 ? "0" + h : h
    m = m < 10 ? "0" + m : m 
    s = s < 10 ? "0" + s : s

    // console.log(`${h}: ${m}: ${s} ${ampm}`)
    getCurrentTime.innerText = `${h}:${m}:${s} ${ampm}`
    
    //..set alarm (step 1)
   if( alarmTime === `${h}:${m} ${ampm}`){
        console.log("Hello alarm...")
        ringtone.play()
        ringtone.loop = true 
   } else {
    ringtone.pause() //..stop the alarm after 60 secs
}
}, 1000)


//..set alarm button 
function setAlarm(){
    //..conditional statement to clear the alarm 
    if(isAlarmSet){  //..if the alarm is set (true)
        alarmTime = " " //..clear the value of the alartTime
        ringtone.pause() //..pause alarm ringtone
        content.classList.remove("disable")
        setAlarmBtn.innerText = "Set Alarm" //..change value of the button when disabled 
        setAlarmBtn.style.background="green"
        return isAlarmSet = false
    }

    //..getting the current hour, minute, ampm value when selected in the dropdown
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`        
    //..display alert if the user didn't select hr, m, ampm 
    if(time.includes("Hour") || time.includes("Minutes") || time.includes("AM/PM")){
        return alert("opps, something went wrong. Select a valid time to set alarm")
    } // console.log(time)

    isAlarmSet = true //...if the user sets an alarm, this will be triggered 
    setAlarmBtn.style.background="red"
    //..set alarm (step 1)
    alarmTime = time

    //..disable the selectMeu when alarm is set 
    content.classList.add("disable")
    //... the text of the button changes when the alarm is set 
    setAlarmBtn.innerText = "Clear Alarm"
              
}
setAlarmBtn.addEventListener("click", setAlarm)
