$(document).ready(function() {
  console.log( "ready!" );                              // REMOVE THIS B4 SUBMITTING!!!
// Global Variables
// Search bar - local storage
var citySearch = document.getElementById("searchbar");
// var button for search button
var searchButton = document.querySelector("#searchBtn");

// Variables for hidden containers - CREATEELEMENT
// var history = document.querySelector("#history")
// var searchDisplay = document.querySelector("#search-display")
// var forecast = document.querySelector("#forecast")


// fetch("api.openweathermap.org/data/2.5/weather?q=citySearch&appid=9023560067b2e7bbffd9b2fa7315fa2f")
//     .then(response => response.json())
//     .then(data => console.log(data))

//     .catch(err => alert("Please try again!"))

    // Local Storage Section



    var saveInput = citySearch.innerHTML
  
    localStorage.setItem("citysearch", saveInput)

    searchButton.addEventListener("click", saveInput);
    console.log(saveInput)

    // Local Storage Section
});






  // API Key: 9023560067b2e7bbffd9b2fa7315fa2f
  