//initialize firebase
var config = {
    apiKey: "AIzaSyDnAMDOX1z_uCv-QvgMdoo3Gh5NERI37KA",
    authDomain: "faa-database.firebaseapp.com",
    databaseURL: "https://faa-database.firebaseio.com",
    projectId: "faa-database",
    storageBucket: "faa-database.appspot.com",
    messagingSenderId: "781668124282"
  };
  firebase.initializeApp(config);

  //global variables
  var database = firebase.database();

  var nNumberInput;
  var craftTypeInput;
  var engineTypeInput;

    var craftTypeData;
    var nNumberData;
    var engineTypeData;
    var expDateData;
    var regTypeData;

    //Button click function
    $("#submit-button").on("click", function() {

            event.preventDefault();

            // Get inputs
            nNumberInput = $("#n-number-input").val().trim();
            craftTypeInput = $("#aircraft-type-select").val().trim();
            engineTypeInput = $("#engine-type-select").val().trim();

            // empty table and call function to generate table headers
            $("table").empty();
            generateTableHeaders();

         //calls firebase and loops through each child searching for specified key values    
        var dataRef =  database.ref();
        dataRef.on('value', function(snapshot){
            snapshot.forEach(function(childSnapshot){

                    //store key values to variables 
                    craftTypeData = childSnapshot.val().CraftType;
                    nNumberData = childSnapshot.val().Nnumber;
                    engineTypeData = childSnapshot.val().EngineType;
                    expDateData = childSnapshot.val().ExpirationDate;
                    regTypeData = childSnapshot.val().RegistrantType;

                    //runs function to create list items based off of the input submitted 
                    if (craftTypeData == craftTypeInput) {
                    createListItem();
                    } else if (nNumberData == nNumberInput) {
                        createListItem();
                    } else if (engineTypeData == engineTypeInput) {
                        createListItem();
                    };
            });
        }); 
    });

    //function to creat list items from the info pulled from firebase and then pushes that info to the table in our html
    function createListItem() {

        //takes the number classifier from database for aircraft type and replaces it to the corresponding def 
        if (craftTypeData == "1") {
            craftTypeData = "Glider";
        } else if (craftTypeData == "2") {
            craftTypeData = "Balloon";
        } else if (craftTypeData == "3") {
            craftTypeData = "Blimp/Derigible";
        } else if (craftTypeData == "4") {
            craftTypeData = "Fixed Wing Single Engine";
        } else if (craftTypeData == "5") {
            craftTypeData = "Fixed Wing Multi Engine";
        } else if (craftTypeData == "6") {
            craftTypeData = "Weight-Shift-Control";
        } else if (craftTypeData == "7") {
            craftTypeData = "Rotorcraft";
        } else if (craftTypeData == "8") {
            craftTypeData = "Powered Parachute";
        } else if (craftTypeData == "9") {
            craftTypeData =  "Gyroplane";
        };

        //takes the number classifier from database for reg type and replaces it with corresponding def
        if (regTypeData == "1") {
            regTypeData = "Individual";
        } else if (regTypeData == "2") {
            regTypeData = "Partnership";
        } else if (regTypeData == "3") {
            regTypeData = "Corporation";
        } else if (regTypeData == "4") {
            regTypeData = "Co-Owned";
        } else if (regTypeData == "5") {
            regTypeData = "Government";
        } else if (regTypeData == "8") {
            regTypeData = "Non Citizen Corp";
        } else if (regTypeData == "9") {
            regTypeData = "Non Citizen Co-Owned";
        };

        //creates new table row with our database info
        var rowTag = $("<tr>");
        rowTag.attr("data-name", nNumberData);
        var nNumberValue = "<td>" + nNumberData + "</td>";
        var craftTypeValue = "<td>" + craftTypeData + "</td>";
        var expDateValue = "<td>" + expDateData + "</td>";
        var regTypeValue = "<td>" + regTypeData + "</td>";
    
        rowTag.append(nNumberValue);
        rowTag.append(craftTypeValue);
        rowTag.append(expDateValue);
        rowTag.append(regTypeValue);
    
        $("table").append(rowTag);
      };


      //function to generate new table headers.
      function generateTableHeaders() {



        var headerRowTag = $("<tr>");
        headerRowTag.addClass("schedule-headers")
        var a = "<th>N-Number</th>";
        var b = "<th>Craft Type</th>";
        var c = "<th>Cert Exp Date</th>";
        var d = "<th>Reg Type</th>";
    
        headerRowTag.append(a);
        headerRowTag.append(b);
        headerRowTag.append(c);
        headerRowTag.append(d);
    
        $("table").append(headerRowTag);
      };
    
    