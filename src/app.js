function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);

  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastEliment = document.querySelector("#forecast");

  let forecastHtml = `<div class="row">`;
  forecast.forEach(function (day, index) {
    if (index < 4) {
      forecastHtml =
        forecastHtml +
        `
//  <div class="col-2">
//    <div class="weather-forecast-date">${formatDay(day.time)}</div>

//    <img
//     src=
"http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
          day.condition.icon
        }.png"
//      alt=""

//   />

//      <div class="weather-forecast-temprature">
//        <span class="weather-forecast-temprature-max"> ${Math.round(
          day.temperature.maximum
        )} °</span>
//       <span class="weather-forecast-temprature-min">${Math.round(
          day.temperature.minimum
        )}°</span>
//     </div>
//    </div>

//    `;
    }
  });
  forecastHtml = forecastHtml + `</div>`;
  forecastEliment.innerHTML = forecastHtml;
}

let selsiusLink = document.querySelector("#selcius-link");
selsiusLink.addEventListener("click", selsiusTemp);

function selsiusTemp(event) {
  event.preventDefault();
  selsiusLink.classList.add("active");
  farenlink.classList.remove("active");
  let temprature = document.querySelector("#temprature");
  temprature.innerHTML = Math.round(selsiusTemprature);
}

function formatDate(timeStamp) {
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
function getForecast(coordinate) {
  let key = "ff4984ao0t6fe3b4cbd3ee0499e420fe";
  let api = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinate.longitude}&lat=${coordinate.latitude}&key=${key}&units=metric`;
  axios.get(api).then(displayForecast);
}

function search(city) {
  let key = "ff4984ao0t6fe3b4cbd3ee0499e420fe";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}`;
  axios.get(apiUrl).then(displayTemprature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

function showFarenTemprature(event) {
  event.preventDefault();
  let calculate = Math.round((selsiusTemprature * 9) / 5 + 32);
  let temprature = document.querySelector("#temprature");
  selsiusLink.classList.remove("active");
  farenlink.classList.add("active");
  temprature.innerHTML = calculate;
}
function displayTemprature(response) {
  console.log(response.data);
  let tempratureEliment = document.querySelector("#temprature");
  let cityEliment = document.querySelector("#city");
  let description = document.querySelector("#description");
  let windeliment = document.querySelector("#wind");
  let humidityEliment = document.querySelector("#humidity");
  let dateEliment = document.querySelector("#date");
  let iconEliment = document.querySelector("#icon");
  tempratureEliment.innerHTML = Math.round(response.data.temperature.current);
  cityEliment.innerHTML = response.data.city;
  selsiusTemprature = response.data.temperature.current;
  description.innerHTML = response.data.condition.description;
  windeliment.innerHTML = Math.round(response.data.wind.speed);
  humidityEliment.innerHTML = response.data.temperature.humidity;
  dateEliment.innerHTML = formatDate(response.data.time * 1000);
  iconEliment.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconEliment.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
}
let selsiusTemprature = null;
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
search("new york");

let farenlink = document.querySelector("#faren-link");
farenlink.addEventListener("click", showFarenTemprature);
displayForecast();
