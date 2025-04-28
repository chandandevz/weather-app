const countryContainer = document.querySelector("#location");
const currentDate = document.querySelector("#date");
const conditionIcon = document.querySelector("#icon");
const temperature = document.querySelector("#temperature");
const conditionText = document.querySelector("#condition");
const searchContainer = document.querySelector("#search-container")
const searchField = document.querySelector("#search-field")
const popup = document.querySelector(".popup")
const closeBtn = document.querySelector("#close-icon")


// let targets = prompt("Enter Your State").toLowerCase();
let targets = "Kolkata";

//converting delhi canada to delhi india
if (targets == "delhi") {
  targets = "delhi, india";
}
let url = `https://api.weatherapi.com/v1/current.json?key=0596f3e9cb6e453ea51134512252304&q=${targets}`;
// 


const fetchData = async () => {
  try{
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    updateDom(data);
  }catch(error){
    // alert("Location Not valid")
    popup.style.display = "block"
    closeBtn.addEventListener("click",()=>{
      popup.style.display = "none"
    })
    
  }
};

const updateDom = (weatherData) => {
  const dates = new Date(weatherData.current.last_updated)
  const day = dates.getDay()-1
  const month = dates.getMonth() -1
  const dayNames = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"]  
  countryContainer.innerText = `${weatherData.location.name}, ${weatherData.location.country}`;
  temperature.innerText = `${weatherData.current.temp_c}°`;
  conditionIcon.src = `${weatherData.current.condition.icon}`;
  conditionText.innerText = `${weatherData.current.condition.text}`;
  currentDate.innerText = `${dayNames[day]} ${dates.getDate()} ${monthNames[month]}`;
};
fetchData();
searchContainer.addEventListener("submit",(e)=>{
    e.preventDefault()
    targets = searchField.value
    url=`https://api.weatherapi.com/v1/current.json?key=0596f3e9cb6e453ea51134512252304&q=${targets}`
    fetchData()
    console.log(targets);
})