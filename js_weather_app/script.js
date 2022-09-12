const wrapper = document.querySelector(".wrapper")
inputPart = document.querySelector(".input-part")
infoText = document.querySelector(".info-text")
inputField = document.querySelector("input")
getLocationBtn = document.querySelector("button")
arrowBack = wrapper.querySelector("header i")
//..api 
let api
var apiKey = config.API_KEY

weatherIcon = document.querySelector("weather-part img")

inputField.addEventListener("keyup", e=>{
    //...if user pressed enter btn input value is not empty 
    if(e.key == "Enter" && inputField.value !=""){
        requestApi(inputField.value)
    }
})

getLocationBtn.addEventListener("click", ()=>{
    //.. The geolocation api is used to get the user's current location
    if(navigator.geolocation){ //..if user's browser supports geolocation
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    } else {
        alert("Browser doesn't support geolocation api")
    }
})

//..if user allow the request, we'll get the latitiute and longitude of the user device
function onSuccess(position){
    // console.log(position)
    const {latitude, longitude} = position.coords //..getting the lat and long from coordinator object
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
    //..addded {&units=metric} to the api to round up the number
    fectchWeatherData()
}

function onError(error){
  infoText.innerText = error.message //..html text will display error message
  infoText.classList.add("error")
}

function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    fectchWeatherData()
}

function fectchWeatherData(){
    infoText.innerText="Getting weather info..."
    infoText.classList.add("pending")

    //...getting api response from the server and returning it into our app parsing it as Js object
    fetch(api).then(response => response.json()).
    then(result => weatherDetails(result)) //...then functiion calling weatherDetails function passing api resulf
}

function weatherDetails(info){
    infoText.classList.replace("pending", "error") //..our css style changes the text info background 
    if(info.cod == "404"){ //..cod is an object called from the weather api
        infoText.innerText = `You entered ${inputField.value} which isn't a valid city` //...if the user input a valid location, it throws error on the info text
    } else{
         //..get api data to properties in info-text   
        const city = info.name
        const country = info.sys.country
        const {description, id} = info.weather[0]
        const{feels_like,humidity, temp} = info.main

        //...using custom icon accoriding to the id which api returns 
        //   if(id == 800){
        //      weatherIcon.src = "icons/clear.svg"
        //   } else if(id >= 200 && id <= 232){
        //      weatherIcon.src = "icons/storm.svg"
        //   } else if(id >= 600 && id <= 622){
        //     weatherIcon.src = "icons/snow.svg"
        //   } else if(id >= 701 && id <= 781){
        //      weatherIcon.src = "icons/haze.svg"
        //   } else if(id >= 804 && id <= 801){
        //     weatherIcon.src = "icons/cloud.svg"
        //   }
        //   else if((id >= 300 && id <= 321) || (id >= 500 && id <= 531)){
        //     weatherIcon.src = "icons/rain.svg"
        //   }
        
        //..parse the above values into the html elements 
        wrapper.querySelector(".temp, .numb").innerText = Math.floor(temp) //..round up number to nearest Integer
        wrapper.querySelector(".weather").innerHTML = description
        wrapper.querySelector(".location span").innerHTML = `${city}, ${country}`
        wrapper.querySelector(".temp .numb-2").innerHTML = Math.floor(feels_like)
        wrapper.querySelector(".humidity span").innerHTML = `${humidity}%`

        infoText.classList.remove("pending", "error") //..if we get the correct city from the api we hide pending and error message
        wrapper.classList.add("active") //..show the dashboard which displays the weather info
        console.log(info)
    }
}

arrowBack.addEventListener("click", ()=>{
    wrapper.classList.remove("active")
})