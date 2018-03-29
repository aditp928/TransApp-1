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
var user = "";
 
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
      $("#time-info").append("<div>" + currentDate +"</div><div>"+time+"</div>");
      $("#location-info").append("<div>Location: "+ response.name + ", lat: "+response.coord.lat+ " lon: " +response.coord.lon + "</div>");
      $("#weather-info").append("<div>Temperature: " + response.main.temp +"</div><div>Wind Speed: "+ response.wind.speed +"</div><div>"+ response.weather[0].description +"</div>");
      $("#weather-header").append("<div><img id='weather-icon'src='http://openweathermap.org/img/w/"+ response.weather[0].icon +".png'></div>")
      console.log(response.weather[0].icon);
      
      // "+ response.weather[0].icon +"
    });


    $.ajax({
      url: "http://services.swpc.noaa.gov/products/noaa-estimated-planetary-k-index-1-minute.json",
      method: "GET"
    })
    .then(function(response){
      console.log(response[response.length-1][1]);
      if (response[response.length-1][1] <5) {
        $("#k-info").append("<div id='k-safe'> The Planetary K-index is "+ response[response.length-1][1] + ". Safe to fly.</div>");
        $("#k-header").append("<div><img src=assets/images/safe.jpg></div>")
      }
      else {
        $("#k-info").append("<div id='k-not-safe'> The K index is "+ response[response.length-1][1]+ ". Not safe to fly.</div>");
      }

    })

var flightTrackerAPIKey = "9d54ab-f75b5f-1552a5-7e9966-5f549b"
var flightTrackerUrl = "http://aviation-edge.com/api/public/flights?key=" + flightTrackerAPIKey;

$.ajax({
  url: flightTrackerUrl,
  method: "GET"
})

  // We store all of the retrieved data inside of this "response"
  .then(function(response) {

      //console.log(response);
       results = JSON.parse(response);
      //console.log(results[0].geography.latitude);

      // Commit out for SignIn demo
      //mapMarkers();
 
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
      map: map,
      icon: "https://cdn2.iconfinder.com/data/icons/fatcow/32x32/plane.png"
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

$("#signUp").on("click", function (signUp) {
  event.preventDefault();
  email = $("#exampleDropdownFormEmail1").val();
  password = $("#exampleDropdownFormPassword1").val();
  console.log("signup test");
  console.log(email);
  console.log(password);

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
});


$('input[type=checkbox]').click(function () {
  console.log($(".form-check-input").is(":checked"))
});


$("#buttonIDContainer").on("click", "#signIn", function (signIn) {
  event.preventDefault();
  email = $("#exampleDropdownFormEmail1").val();
  password = $("#exampleDropdownFormPassword1").val();
  console.log("signin test");

  $("#exampleDropdownFormPassword1").val('');
  console.log(email);
  console.log(password);

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    if (error) {
      console.log("signIn Error");
      console.log(error.code);
      console.log(error.message);
    }
  });
  //
  firebase.auth().onAuthStateChanged(function (users) {
    if (users) {
      // User is signed in.
      $('.dropdown-toggle').dropdown('toggle');
      $("#dropdownMenuButton").replaceWith(
        '<button type="submit" id="signOut" class="btn btn-primary">Sign Out</button>'
      );
      user = "signedIn";
      signedIn();
      console.log(user);
    } else if (user == "signedOut") {
      initMap();
      // No user is signed in.
    } else {}
  });
});


$("#buttonIDContainer").on("click", "#signOut", function (signOut) {
  event.preventDefault();

  firebase.auth().signOut().then(function () {
    console.log("Logged out!")

    $("#signOut").replaceWith(
      '<button class ="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Login</button >'
    );
    user = "signedOut";

  }, function (error) {
    console.log(error.code);
    console.log(error.message);
  });
});

function signedIn() {
  if (user == "signedIn") {
    mapMarkers();
  } else {
    initMap();
  }
}

