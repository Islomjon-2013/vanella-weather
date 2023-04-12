function dateFormat(timeStamp) {
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  let date = new Date(timeStamp);
  let hour = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hour < 10) {
    minutes = `0${minutes}`;
  }

  let day = days[date.getDay()];

  return `${day}${hour}:${minutes}`;
}
function search(city) {
  let apiKey = "d7db275969a20c48ecc4e2ee48fe391b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemprature);
}

function searchButton(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

function displayTemprature(response) {
  console.log(response.data.weather);
  let tempratureEliment = document.querySelector("#temprature");
  tempratureEliment.innerHTML = Math.round(response.data.main.temp);
  let cityEliment = document.querySelector("#city");
  cityEliment.innerHTML = response.data.name;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let humidityEliment = document.querySelector("#humidity");
  humidityEliment.innerHTML = response.data.main.humidity;
  let windeliment = document.querySelector("#wind");
  windeliment.innerHTML = Math.round(response.data.wind.speed);
  let dateEliment = document.querySelector("#date");
  dateEliment.innerHTML = dateFormat(response.data.dt * 1000);
  let iconEliment = document.querySelector("#icon");
  selsiusTemprature = response.data.main.temp;
  iconEliment.setAttribute(
    "src",
    ` https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconEliment.setAttribute("alt", response.data.weather[0].description);
}
function showFarenTemprature(event) {
  event.preventDefault();
  let calculate = Math.round((selsiusTemprature * 9) / 5 + 32);
  let temprature = document.querySelector("#temprature");
  selsiusLink.classList.remove("active");
  farenlink.classList.add("active");
  temprature.innerHTML = calculate;
}
function selsiusTemp(event) {
  event.preventDefault();
  selsiusLink.classList.add("active");
  farenlink.classList.remove("active");
  let temprature = document.querySelector("#temprature");
  temprature.innerHTML = Math.round(selsiusTemprature);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchButton);
let farenlink = document.querySelector("#faren-link");
farenlink.addEventListener("click", showFarenTemprature);
let selsiusTemprature = null;
let selsiusLink = document.querySelector("#selcius-link");
selsiusLink.addEventListener("click", selsiusTemp);
