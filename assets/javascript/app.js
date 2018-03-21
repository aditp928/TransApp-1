

var weatherAPIKey = "f3b57377fd45d3c75ef5eb8b659e8ad3";

// Here we can set the var city to a value coming from the flight tracker API
// We can associate the ajax call to an on-click so that the city info can populate
var city = "";

// Here we are building the URL we need to query the database
var weatherURL = "https://api.openweathermap.org/data/2.5/weather?" +
  "q=" + city +"&units=imperial&appid=" + weatherAPIKey;

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
  url: weatherURL,
  method: "GET"
})
  // We store all of the retrieved data inside of this "response"
  .then(function(response) {
      console.log(response);
  });