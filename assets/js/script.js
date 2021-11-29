// Global Variables
var weatherUnit = {"degrees": "° C", "speed": "km/h", "units": "metric"};
var searchButton = document.querySelector("#searchBtn");
var searchFormEl = document.querySelector(".searchForm");
var fiveDayForecast = document.querySelector("#fiveDayForecast");
var currentTemp = document.querySelector("#currentTemp");
var currentWind = document.querySelector("#currentWind");
var currentHumidity = document.querySelector("#currentHumidity");
var currentUVIndex = document.querySelector("#currentUVIndex");
var currentCity = document.querySelector("#currentCityName");
var searchHistory = document.querySelector("#searchHistory");
var searchbar = document.getElementById("searchbar");
var forecastDiv = document.getElementById("forecast");
var searchList = [];


$(document).ready(function() {

  // Loading search history from local storage
  if (localStorage.getItem("searchList") == null) {
    searchList = [];
  } else { 
  searchList = JSON.parse(localStorage.getItem("searchList"));
  }
  // Calling displaySearchList function
  displaySearchList();

  // Search button functionality
  searchFormEl.addEventListener("submit", function(event) {  
  event.preventDefault();
  // Calling doSearch function
  doSearch();
  })
})

function doSearch() {
  var citySearch = searchbar.value;
  citySearch = citySearch.trim();

  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=9023560067b2e7bbffd9b2fa7315fa2f&units=metric")
    .then(response => response.json())    
    .then(data => {
      // Invalid entry response
      if (data.name === undefined) {
         alert(data.message);
         return false;
      }      
      var coordinates = data.coord;
      // goes through each item in searchList and passes it as item. 
      // If item is the same as citySearch, return false because we don't want it in the array anymore
      searchList = searchList.filter(function(item) {
          if (item.toLowerCase() == citySearch.toLowerCase()) {
            return false;
          } else {
            return true;
          }
      });    
      // Pushing citySearch into searchList array
      searchList.push(citySearch);
      localStorage.setItem("searchList", JSON.stringify(searchList));
      searchHistory.innerHTML = "";
      // Calling displaySearchList function
      displaySearchList();
      
      var cityName = data.name
      var date = new Date(data.dt*1000);
      var weatherIcon = getIconURL(data.weather[0].icon);
      var dateString = "(" + formatDate(date) + ")";

      currentCity.innerHTML = cityName + " " + dateString;
      var weatherImg = document.createElement("img");
      weatherImg.setAttribute("src", weatherIcon);
      currentCity.appendChild(weatherImg);
      if (data.sys.country == "US") {
        weatherUnit = {"degrees": "° F", "speed": "MPH", "units": "imperial"};
      } else {
        weatherUnit = {"degrees": "° C", "speed": "KM/H", "units": "metric"};
      }
       

      fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + coordinates.lat + "&lon=" + coordinates.lon + "&appid=9023560067b2e7bbffd9b2fa7315fa2f&units=" + weatherUnit.units)
      .then(response => response.json())
      .then(forecast => {
      
        var forecastToday = forecast.daily[0];
        currentTemp.innerHTML = Math.round(forecastToday.temp.max) + weatherUnit.degrees;
        currentWind.innerHTML = forecastToday.wind_speed + weatherUnit.speed;
        currentHumidity.innerHTML = forecastToday.humidity + "%";
        currentUVIndex.innerHTML = forecastToday.uvi;
        // to display the current UV colour we need to reset the class each time
        currentUVIndex.classList = ["current-condition-value"];
        var uvi = parseInt(forecastToday.uvi);        
        if (uvi < 2) {
          currentUVIndex.classList.add("favourable");
        } else if (uvi < 6) {
          currentUVIndex.classList.add("moderate");
        } else {
          currentUVIndex.classList.add("severe");
        }

        fiveDayForecast.innerHTML = "";

        for(var i = 1; i <= 5; i++) {
          var dayDiv = createWeatherCard(forecast.daily[i]);
          fiveDayForecast.appendChild(dayDiv);       
        }
      })
      forecastDiv.classList.remove("hide");
    })
    .catch(err => alert("Please try again!"))
    return false;
}

function displaySearchList() {
  searchList.forEach(city => {
    var cityButton = document.createElement("button");
    cityButton.innerHTML = city;
    cityButton.setAttribute("type", "button");
    searchHistory.append(cityButton);
    cityButton.onclick = function() {
      searchbar.value = city;
      doSearch();
    }

  });
}
function getIconURL(icon) {
  
   var iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

   return iconUrl;
}

// Five day forecast display cards
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
  
  temp.innerHTML = "Temp: " + Math.round(dayData.temp.max)+ weatherUnit.degrees;
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