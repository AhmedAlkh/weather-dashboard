// Global Variables
// var button for search button
var searchButton = document.querySelector("#searchBtn")
// inputValue for input search box
var inputValue = document.querySelector("search-box")

// Variables for hidden containers
var history = document.querySelector("#history")
var searchDisplay = document.querySelector("#search-display")
var forecast = document.querySelector("#forecast")


fetch("https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=9023560067b2e7bbffd9b2fa7315fa2f")
    .then(response => response.json())
    .then(data => console.log(data))

    .catch(err => alert("Wrong city name!"))





  // API Key: 9023560067b2e7bbffd9b2fa7315fa2f
  