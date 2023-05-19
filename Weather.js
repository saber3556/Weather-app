const wrapper=document.querySelector(".wrapper"),
    inputpart=document.querySelector(".input-part"),
    infotext=document.querySelector(".info-text"),
    inputfieled=document.querySelector("input"),
    locationbtn=document.querySelector("button"),
    arroundback=wrapper.querySelector("header i"),
    wicon=document.querySelector(".weather-part img");
let api;

inputfieled.addEventListener("keyup",e=>{
    //if user persse ENTER btn and input value is not empty
    if(e.key=="Enter" && inputfieled.value!=""){
        reqeustApi(inputfieled.value);
    }
});
locationbtn.addEventListener("click",()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess,onError)
    }else{
        alert("Your browser not support geolocation Api");
    }
});
function onSuccess(position){
    console.log(position)
    const {latitude,longitude}=position.coords;
     api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=8e63e38c600b1818b2edf212fdbf4ddb`;
    fethdata();
    }
function onError(error){
    infotext.innerText = error.message;
    infotext.classList.add("error");
}

function reqeustApi(city){
     api= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=8e63e38c600b1818b2edf212fdbf4ddb`;
    fethdata();
}
function fethdata(){
    infotext.innerText = "Getting weather details...";
    infotext.classList.add("pending");
    fetch(api).then(response=>response.json()).then(result=>weatherDetails(result));
}
function weatherDetails(info){
    infotext.classList.replace("pending", "error");
    if(info.cod ==  "404"){
        infotext.innerText = `${inputfieled.value} isn't a valid city name`;
    }else{
            const city=info.name;
            const country=info.sys.country;
            const {description,id}=info.weather[0];
            const {feels_like, humidity, temp}=info.main;

            if(id==800){
                wicon.src="weather-app-icons/Weather Icons/clear.svg";
            }else if(id>=200 && id<=232){
                wicon.src="weather-app-icons/Weather Icons/storm.svg";
            }else if(id>=600 && id<=622){
                wicon.src="weather-app-icons/Weather Icons/snow.svg";
            }else if(id>=701 && id<=781){
                wicon.src="weather-app-icons/Weather Icons/haze.svg";
            }else if(id>=801 && id<=804){
                wicon.src="weather-app-icons/Weather Icons/cloud.svg";
            }else if((id>=300 && id<=321) || (id>=500 && id<=531)){
                wicon.src="weather-app-icons/Weather Icons/rain.svg";
            }



            wrapper.querySelector(".temp .numb").innerText=Math.floor(temp);
            wrapper.querySelector(".weather").innerText=description;
            wrapper.querySelector(".location span").innerText=`${city},${country}`;
            wrapper.querySelector(".temp .numb-2").innerText=Math.floor(feels_like);
           /* wrapper.querySelector(".humidity span").innerText = `${humidity}%`;*/


        infotext.classList.remove("pending", "error");
        wrapper.classList.add("active");
        console.log(info); 
    }
    
}
arroundback.addEventListener("click",()=>{
    wrapper.classList.remove("active")
})