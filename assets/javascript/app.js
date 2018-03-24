var currentTime = moment();
var currentDate = moment(currentTime).format("DD MMM YYYY");
var time = moment(currentTime).format("h:mm A")
var results=[];
var weatherAPIKey = "f3b57377fd45d3c75ef5eb8b659e8ad3";
// Here we can set the var city to a value coming from the flight tracker API
// We can associate the ajax call to an on-click so that the city info can populate
var city = "";
// "city" must be city,state format to populate URL correctly. Ex below for console.log
city = "orlando,florida";
// Here we are building the URL we need to query the database
var weatherURL = "http://api.openweathermap.org/data/2.5/weather?" +
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
      console.log("Location: "+ response.name + " lat: "+response.coord.lat+ " lon: " +response.coord.lon);
      console.log(currentDate)
      $("#time-info").append("<div>TODAY: " + currentDate +"</div><div>"+time+"</div>");
      $("#location-info").append("Location: "+ response.name + ", lat: "+response.coord.lat+ " lon: " +response.coord.lon);
      $("#weather-info").append("<div>Temperature: " + response.main.temp +"</div><div>Wind Speed: "+ response.wind.speed +"</div><div>"+ response.weather[0].description +"</div><div><img src='http://openweathermap.org/img/w/"+ response.weather[0].icon +".png'></div>");
      console.log(response.weather[0].icon);
      
      // "+ response.weather[0].icon +"
    });

    
var flightTrackerAPIKey = "9d54ab-f75b5f-1552a5-7e9966-5f549b"
var flightTrackerUrl = "http://aviation-edge.com/api/public/flights?key=" + flightTrackerAPIKey;

$.ajax({
  url: flightTrackerUrl,
  method: "GET"
})

  // We store all of the retrieved data inside of this "response"
  .then(function(response) {

      console.log(response);
       results = JSON.parse(response);
      console.log(results[0].geography.latitude);

      mapMarkers();
 
  }
)

//function that adds markers to the google maps. 
function mapMarkers() {
  for (var i = 0; i < results.length; i++) {

    var longitude = results[i].geography.longitude;
    var latitude = results[i].geography.latitude; 
    console.log(longitude);
    console.log(latitude);
    var latlng = new google.maps.LatLng(latitude, longitude);

    var marker = new google.maps.Marker({
      position: latlng,
      map: map
    });
  }
}
// Creates the google maps on the page
var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 28.54,
            lng: -81.38
        },
        zoom: 8
    });  
} 