console.log("linked")

var config = {
    apiKey: "AIzaSyDnAMDOX1z_uCv-QvgMdoo3Gh5NERI37KA",
    authDomain: "faa-database.firebaseapp.com",
    databaseURL: "https://faa-database.firebaseio.com",
    projectId: "faa-database",
    storageBucket: "faa-database.appspot.com",
    messagingSenderId: "781668124282"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#submit-button").on("click", function() {

    event.preventDefault();

    // Get inputs
    nNumber = $("#n-number-input").val().trim();
    craftType = $("#aircraft-type-select").val().trim();
    engineType = $("#engine-type-select").val().trim();

    console.log(nNumber);
    console.log(craftType);
    console.log(engineType);

    
   var craftType =  database.ref().equalTo("Craft-Type", "4");
   console.log(craftType);
  
  });