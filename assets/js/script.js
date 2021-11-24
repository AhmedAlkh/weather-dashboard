// var button for search button
// inputValue for input search box

fetch("https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=9023560067b2e7bbffd9b2fa7315fa2f")
    .then(response => response.json())
    .then(data => console.log(data))

    .catch(err => alert("Wrong city name!"))


  // 9023560067b2e7bbffd9b2fa7315fa2f