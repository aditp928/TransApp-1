var currentTime = moment();
var currentDate = moment(currentTime).format("DD MMM YYYY");
var time = moment(currentTime).format("h:mm A")
var results=[];

var weatherAPIKey = "4b6c7091744da6c1ad4dcd9d3603fd15";

// Here we can set the var city to a value coming from the flight tracker API
// We can associate the ajax call to an on-click so that the city info can populate
var city = "Orlando";
var state = "Florida";
place = city + "," + state;
console.log(place);

// "city" must be city,state format to populate URL correctly. Ex below for console.log

// Here we are building the URL we need to query the database
var weatherURL = "http://api.openweathermap.org/data/2.5/weather?" +
  "q=" + place +"&units=imperial&appid=" + weatherAPIKey;
  console.log(weatherURL);
var user = "";

$("#changePlace").on("click", function(){
  event.preventDefault();

  city = $("#cityInput").val();
  state = $("#stateInput").val();
  place = city + "," + state;

  weatherURL = "http://api.openweathermap.org/data/2.5/weather?" +
    "q=" + place + "&units=imperial&appid=" + weatherAPIKey;
  console.log(weatherURL);

  clearInfo();
  setInfo();

  console.log(city);
  console.log(state);
});

// Here we run our AJAX call to the OpenWeatherMap API
function setInfo() {
  $.ajax({
  url: weatherURL,
  method: "GET"
})
  // We store all of the retrieved data inside of this "response"
  .then(function(response) {

      console.log(response);
      console.log("<div><br>"+ response.name + " lat: "+response.coord.lat+ " lon: " +response.coord.lon + "</div>");
      console.log(currentDate)
      $("#time-info").append("<div>" + currentDate +"</div><div>"+time+"</div>");
      $("#location-info").append("<div>"+ response.name + ", lattitude: "+response.coord.lat+ " longitude: " +response.coord.lon + "</div>");
      $("#weather-info").append("<div>Temperature: " + response.main.temp +"F&#176;</div><div>Wind Speed: "+ response.wind.speed +"mph</div><div>"+ response.weather[0].description +"</div>");
      $("#weather-header").append("<div><img id='weather-icon'src='http://openweathermap.org/img/w/"+ response.weather[0].icon +".png'></div>")
      console.log(response.weather[0].icon);

      map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: response.coord.lat,
          lng: response.coord.lon,
        },
        zoom: 8
      });
      
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
  }

function clearInfo() {
  $("#time-info").empty();
  $("#location-info").empty();
  $("#weather-info").empty();
  $("#weather-header").empty();
  $("#k-info").empty();
  $("#k-header").empty();
}

setInfo();
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
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        
    });  

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


$("#toolbar").on("click", "#signIn", function (signIn) {
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


$("#toolbar").on("click", "#signOut", function (signOut) {
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


function updateCity(){
  
  var cityThatUserEntered =$("#cityInput").val().trim();
  var cityState = cityThatUserEntered.split(",");
  
  for(key in cityState){
    // cityState[key].trim();
    cityState[key]=cityState[key].trim().replace(" ","_");

  }

  var city = cityState[0];
  var state = cityState[1];
  console.log(city,state);

  // figure out how to return value

 
  
  // $("#").val(key);
}



  $("#city-input-submit").on("click", function(event){
    event.preventDefault();
    updateCity();
  })





$("#clouds").on("click", function() {
  var myMapType = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
      var normalizedCoord = getNormalizedCoord(coord, zoom);
      if (!normalizedCoord) {
        return null;
      }
      var bound = Math.pow(2, zoom);
      return "https://tile.openweathermap.org/map/clouds_new/" + zoom + "/" + normalizedCoord.x + "/" + (bound - normalizedCoord.y - 1) + ".png?appid=4b6c7091744da6c1ad4dcd9d3603fd15" ;
},
    tileSize: new google.maps.Size(256, 256),
    maxZoom: 8,
    minZoom: 0,
    name: 'mymaptype'
  });

  function getNormalizedCoord(coord, zoom) {
    var y = coord.y;
    var x = coord.x;

    
    var tileRange = 1 << zoom;

    
    if (y < 0 || y >= tileRange) {
      return null;
    }

    if (x < 0 || x >= tileRange) {
      x = (x % tileRange + tileRange) % tileRange;
    }

    return {
      x: x,
      y: y
    };
  }

  map.overlayMapTypes.insertAt(0, myMapType);
}

)
$("#sealevel").on("click", function() {
  var myMapType = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
      var normalizedCoord = getNormalizedCoord(coord, zoom);
      if (!normalizedCoord) {
        return null;
      }
      var bound = Math.pow(2, zoom);
      return "https://tile.openweathermap.org/map/pressure_new/" + zoom + "/" + normalizedCoord.x + "/" + (bound - normalizedCoord.y - 1) + ".png?appid=4b6c7091744da6c1ad4dcd9d3603fd15" ;
},
    tileSize: new google.maps.Size(256, 256),
    maxZoom: 8,
    minZoom: 0,
    name: 'mymaptype'
  });

  function getNormalizedCoord(coord, zoom) {
    var y = coord.y;
    var x = coord.x;

    
    var tileRange = 1 << zoom;

    
    if (y < 0 || y >= tileRange) {
      return null;
    }

    if (x < 0 || x >= tileRange) {
      x = (x % tileRange + tileRange) % tileRange;
    }

    return {
      x: x,
      y: y
    };
  }

  map.overlayMapTypes.insertAt(0, myMapType);
}

)
$("#windspeed").on("click", function() {
  var myMapType = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
      var normalizedCoord = getNormalizedCoord(coord, zoom);
      if (!normalizedCoord) {
        return null;
      }
      var bound = Math.pow(2, zoom);
      return "https://tile.openweathermap.org/map/wind_new/" + zoom + "/" + normalizedCoord.x + "/" + (bound - normalizedCoord.y - 1) + ".png?appid=4b6c7091744da6c1ad4dcd9d3603fd15" ;
},
    tileSize: new google.maps.Size(256, 256),
    maxZoom: 8,
    minZoom: 0,
    name: 'mymaptype'
  });

  function getNormalizedCoord(coord, zoom) {
    var y = coord.y;
    var x = coord.x;

    
    var tileRange = 1 << zoom;

    
    if (y < 0 || y >= tileRange) {
      return null;
    }

    if (x < 0 || x >= tileRange) {
      x = (x % tileRange + tileRange) % tileRange;
    }

    return {
      x: x,
      y: y
    };
  }

  map.overlayMapTypes.insertAt(0, myMapType);
}

)

$("#temperature").on("click", function() {
  var myMapType = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
      var normalizedCoord = getNormalizedCoord(coord, zoom);
      if (!normalizedCoord) {
        return null;
      }
      var bound = Math.pow(2, zoom);
      return "https://tile.openweathermap.org/map/temp_new/" + zoom + "/" + normalizedCoord.x + "/" + (bound - normalizedCoord.y - 1) + ".png?appid=4b6c7091744da6c1ad4dcd9d3603fd15" ;
},
    tileSize: new google.maps.Size(256, 256),
    maxZoom: 8,
    minZoom: 0,
    name: 'mymaptype'
  });

  function getNormalizedCoord(coord, zoom) {
    var y = coord.y;
    var x = coord.x;

    
    var tileRange = 1 << zoom;

    
    if (y < 0 || y >= tileRange) {
      return null;
    }

    if (x < 0 || x >= tileRange) {
      x = (x % tileRange + tileRange) % tileRange;
    }

    return {
      x: x,
      y: y
    };
  }

  map.overlayMapTypes.insertAt(0, myMapType);
}

)

var mapreset = $("#map").clone()


$("#reset").on("click", function(){
  $("#map").replaceWith(mapreset.clone())
  $("#map").replaceWith(mapreset);
  initMap();
  mapMarkers();
});

