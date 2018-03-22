var currentTime = moment();
<<<<<<< HEAD
var currentDate = moment(currentTime).format("MMMM Do YYYY, h:mm:ss a");
=======
var currentDate = moment(currentTime).format("DD MMM YYYY");
var time = moment(currentTime).format("h:mm A")
>>>>>>> 77dfbe316e76f5f18e0f162854012355028efaa1

var weatherAPIKey = "f3b57377fd45d3c75ef5eb8b659e8ad3";
// Here we can set the var city to a value coming from the flight tracker API
// We can associate the ajax call to an on-click so that the city info can populate
var city = "";
// "city" must be city,state format to populate URL correctly. Ex below for console.log
city = "orlando,florida";
// Here we are building the URL we need to query the database
var weatherURL = "https://api.openweathermap.org/data/2.5/weather?" +
  "q=" + city +"&units=imperial&appid=" + weatherAPIKey;
  console.log(weatherURL);

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
  url: weatherURL,
  method: "GET"
})
  // We store all of the retrieved data inside of this "response"
  .then(function(response) {
      console.log(response);
<<<<<<< HEAD
      console.log(currentDate)
  });

$("#location-info").text(currentDate);
=======
      console.log("Location: "+ response.name + " lat: "+response.coord.lat+ " lon: " +response.coord.lon);
      console.log(currentDate)
      $("#time-info").append("<div>TODAY: " + currentDate +"</div><div>"+time+"</div>");
      $("#location-info").append("Location: "+ response.name + ", lat: "+response.coord.lat+ " lon: " +response.coord.lon);
      $("#weather-info").append("<div>Temperature: " + response.main.temp +"</div><div>Wind Speed: "+ response.wind.speed +"</div><div>"+ response.weather[0].description +"</div>")
    });
>>>>>>> 77dfbe316e76f5f18e0f162854012355028efaa1
