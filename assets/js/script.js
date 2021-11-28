var weatherUnit = {"degrees": "° C", "speed": "km/h"};
$(document).ready(function() {
  console.log( "ready!" );                              // REMOVE THIS B4 SUBMITTING!!!
// Global Variables
var searchButton = document.querySelector("#searchBtn");
var searchFormEl = document.querySelector(".searchForm");
var fiveDayForecast = document.querySelector("#fiveDayForecast");
var currentTemp = document.querySelector("#currentTemp");
var currentWind = document.querySelector("#currentWind");
var currentHumidity = document.querySelector("#currentHumidity");
var currentUVIndex = document.querySelector("#currentUVIndex");
var currentCity = document.querySelector("#currentCityName");


// get searches from previous session

searchFormEl.addEventListener("submit", function(event) {
 event.preventDefault();
 var citySearch = document.getElementById("searchbar").value;
  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=9023560067b2e7bbffd9b2fa7315fa2f&units=metric")
    .then(response => response.json())
    .then(data => {
      console.log("data", data);
      var coordinates = data.coord;

      var currentDayForecast = document.createElement("div")
      var cityName = data.name
      var date = new Date(data.dt*1000);
      var weatherIcon = getIconURL(data.weather[0].icon);
      var dateString = "(" + formatDate(date) + ")";
      console.log(weatherIcon);
      currentCity.innerHTML = cityName + " " + dateString;
      var weatherImg = document.createElement("img");
      weatherImg.setAttribute("src", weatherIcon);
      currentCity.appendChild(weatherImg);
      //currentTemp.html()

      
      
      

      fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + coordinates.lat + "&lon=" + coordinates.lon + "&appid=9023560067b2e7bbffd9b2fa7315fa2f&units=metric")
      .then(response => response.json())
      .then(forecast => {
        console.log(data)
        console.log(forecast.daily)
        var forecastToday = forecast.daily[0];
        currentTemp.innerHTML = forecastToday.temp.max + weatherUnit.degrees;
        currentWind.innerHTML = forecastToday.wind_speed + weatherUnit.speed;
        currentHumidity.innerHTML = forecastToday.humidity + "%";
        currentUVIndex.innerHTML = forecastToday.uvi;

        //currentTemp.html(forecastToday);
        for(var i = 1; i <= 5; i++) {
          var dayDiv = createWeatherCard(forecast.daily[i]);
          fiveDayForecast.appendChild(dayDiv);

          //Create div for 5 day forecast
          //append to forecast section
          var saveData = localStorage.getItem("savedata");          
        }
      })
    })
    .catch(err => console.log(err)// alert("Please try again!")
    )
})
})

function getIconURL(icon) {
  console.log(icon, "WI");
   var iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

   return iconUrl;
}

function createWeatherCard(dayData) {
  var forecastDiv = document.createElement("div");
  forecastDiv.classList = ["col-xl col-lg-2 col-md-6 col-sm-12 col-xs-12"];
  var date = new Date(dayData.dt*1000);
  var dayCard = document.createElement("div");
  dayCard.classList = ["forecastCard card"];
  var dayCardBody = document.createElement("div");
  dayCardBody.classList = ["card-body"];
  var dateDiv = document.createElement("h5");
  dateDiv.classList = ["card-title"];
  dateDiv.innerHTML = formatDate(date);
  var imgIcon = document.createElement("img");
  imgIcon.classList = ["weatherIcon"];
  imgIcon.setAttribute("src", getIconURL(dayData.weather[0].icon));
  var temp = document.createElement("div");
  var wind = document.createElement("div");
  var humidity = document.createElement("div");
  // temp wind humidity
  temp.innerHTML = "Temp: " + dayData.temp.max + weatherUnit.degrees;
  wind.innerHTML = "Wind: " + dayData.wind_speed + weatherUnit.speed;
  humidity.innerHTML = "Humidity: " + dayData.humidity + "%";
  


  dayCard.appendChild(dayCardBody);
  dayCardBody.appendChild(dateDiv);
  dayCardBody.appendChild(imgIcon);
  dayCardBody.appendChild(temp);
  dayCardBody.appendChild(wind);
  dayCardBody.appendChild(humidity);
  forecastDiv.appendChild(dayCard);
  return forecastDiv;
}

function formatDate(date) {
  return (date.getMonth() + 1) + "/" + date.getDate()  + "/" + date.getFullYear();
}



/* city name, the date, an icon representation of weather conditions, 
    the temperature, the humidity, the wind speed, and the UV index */

