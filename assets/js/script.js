$(document).ready(function() {
  console.log( "ready!" );                              // REMOVE THIS B4 SUBMITTING!!!
// Global Variables
// Search bar - local storage

// var button for search button
var searchButton = document.querySelector("#searchBtn");
var searchFormEl = document.querySelector(".searchForm");

searchFormEl.addEventListener("submit", function(event) {
 event.preventDefault();
 var citySearch = document.getElementById("searchbar").value;
  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=9023560067b2e7bbffd9b2fa7315fa2f")
    .then(response => response.json())
    .then(data => {
      var coordinates = data.coord;

      var currentDayForecast = document.createElement("div")
      var cityName = data.name
      var date = new Date(data.dt*1000).toLocaleString();

      var cityNameAndDate = document.createElement("h2");
      cityNameAndDate.innerText = cityName + " " + date;

      var todayForecastEl = document.getElementById("todayForecast")
      todayForecastEl.removeChild(todayForecastEl.firstChild);
      currentDayForecast.appendChild(cityNameAndDate)
      todayForecastEl.appendChild(currentDayForecast);

      fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + coordinates.lat + "&lon=" + coordinates.lon + "&appid=9023560067b2e7bbffd9b2fa7315fa2f")
      .then(response => response.json())
      .then(forecast => {
        console.log(data)
        console.log(forecast.daily)
        for(var i = 0; i <= 4; i++) {
          var tempMax = forecast.daily[i].temp.max;
          var tempMin = forecast.daily[i].temp.min;
          console.log((tempMax + tempMin) / 2)
          console.log(forecast.daily[i].uvi)

          //Create div for 5 day forecast
          //append to forecast section

        }
      })
    })
    .catch(err => alert("Please try again!"))


    /* city name, the date, an icon representation of weather conditions, 
    the temperature, the humidity, the wind speed, and the UV index */


    // Local Storage Section
    // var saveInput = citySearch.innerHTML
  
    // localStorage.setItem("citysearch", saveInput)

    // searchButton.addEventListener("click", saveInput);
    // console.log(saveInput)
    // Local Storage Section
});
})

// Variables for hidden containers - CREATEELEMENT
// var history = document.querySelector("#history")
// var searchDisplay = document.querySelector("#search-display")
// var forecast = document.querySelector("#forecast")

// "api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=9023560067b2e7bbffd9b2fa7315fa2f"
// `api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=9023560067b2e7bbffd9b2fa7315fa2f`







  // API Key: 9023560067b2e7bbffd9b2fa7315fa2f
  