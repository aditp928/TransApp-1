var currentTime = moment();
var currentDate = moment(currentTime).format("DD MMM YYYY");
var time = moment(currentTime).format("h:mm A")

var weatherAPIKey = "f3b57377fd45d3c75ef5eb8b659e8ad3";
// Here we can set the var city to a value coming from the flight tracker API
// We can associate the ajax call to an on-click so that the city info can populate
var city = "";
// "city" must be city,state format to populate URL correctly. Ex below for console.log
city = "orlando,florida";
// Here we are building the URL we need to query the database
var weatherURL = "http://api.openweathermap.org/data/2.5/weather?" +
  "q=" + city + "&units=imperial&appid=" + weatherAPIKey;
console.log(weatherURL);

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
    url: weatherURL,
    method: "GET"
  })
  // We store all of the retrieved data inside of this "response"
<<<<<<< Updated upstream
  .then(function(response) {
      console.log(response);
      console.log("Location: "+ response.name + " lat: "+response.coord.lat+ " lon: " +response.coord.lon);
      console.log(currentDate)
      $("#time-info").append("<div>TODAY: " + currentDate +"</div><div>"+time+"</div>");
      $("#location-info").append("Location: "+ response.name + ", lat: "+response.coord.lat+ " lon: " +response.coord.lon);
      $("#weather-info").append("<div>Temperature: " + response.main.temp +"</div><div>Wind Speed: "+ response.wind.speed +"</div><div>"+ response.weather[0].description +"</div><div><img src='https://openweathermap.org/img/w/"+ response.weather[0].icon +".png'></div>");
      console.log(response.weather[0].icon);
      
      // "+ response.weather[0].icon +"
    });
=======
  .then(function (response) {
    console.log(response);
    console.log("Location: " + response.name + " lat: " + response.coord.lat + " lon: " + response.coord.lon);
    console.log(currentDate)
    $("#time-info").append("<div>TODAY: " + currentDate + "</div><div>" + time + "</div>");
    $("#location-info").append("Location: " + response.name + ", lat: " + response.coord.lat + " lon: " + response.coord.lon);
    $("#weather-info").append("<div>Temperature: " + response.main.temp + "</div><div>Wind Speed: " + response.wind.speed + "</div><div>" + response.weather[0].description + "</div><div><img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png'></div>");
    console.log(response.weather[0].icon);

    // "+ response.weather[0].icon +"
  });

>>>>>>> Stashed changes
