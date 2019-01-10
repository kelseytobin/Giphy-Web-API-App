 //create topics array
 var topics = ["Biggie Smalls", "Snoop Dog", "Phife Dawg", "Busta Rhymes", "Drake"];

 
 //function loops through topics array, creates button, and appends to page
 function createGifButton() {
     for (var i = 0; i < topics.length; i++) {
         var btn = $("<button>");
         btn.addClass("name");
         btn.addClass("btn btn-primary");
         btn.attr("data-name", topics[i]);
         btn.text(topics[i]);
         $("#button-display").append(btn);
     }
 };

 function displayGifs() {
     //event listener for buttons appended to html
     $("button").on("click", function () {

        // //empty gifs from previous button click
        $("#gif-display").empty();

        //create variable to include inside url query- this refers to button that was clicked
        var person = $(this).attr("data-name");

        //construct url to search Giphy for gifs related to topics
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            person + "&api_key=HRHgIG4zqFVU91tc8vZifNXXdYGAobgR&limit=10";

        //perform ajax GET request
        $.ajax({
                url: queryURL,
                method: "GET"
            })

            //after data comes back from the API
            .then(function (response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var personImage = $("<img>");
                    personImage.attr("src", results[i].images.fixed_height.url);
                    gifDiv.append(p);
                    gifDiv.append(personImage);
                    $("#gif-display").prepend(gifDiv)
                }
            });
    });
 };


 //add new Gif button function
 function addNewRapper() {
     $("#addGif").on("click", function () { //adds listener to form submit button
         var newPerson = $("#artist-input").val().trim(); //stores user input into variable
         topics.push(newPerson); //adds new input into topics array
         createGifButton();
     });
 };


 //execute
 $(document).ready(function () {
     createGifButton();
     displayGifs();
     addNewRapper();

    //  //event listener for buttons appended to html
    //  $("button").on("click", function () {

    //      //empty gifs from previous button click
    //      $("#gif-display").empty();

    //      //create variable to include inside url query- this refers to button that was clicked
    //      var person = $(this).attr("data-name");

    //      //construct url to search Giphy for gifs related to topics
    //      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    //          person + "&api_key=HRHgIG4zqFVU91tc8vZifNXXdYGAobgR&limit=10";

    //      //perform ajax GET request
    //      $.ajax({
    //              url: queryURL,
    //              method: "GET"
    //          })

    //          //after data comes back from the API
    //          .then(function (response) {
    //              var results = response.data;

    //              for (var i = 0; i < results.length; i++) {
    //                  var gifDiv = $("<div>");
    //                  var rating = results[i].rating;
    //                  var p = $("<p>").text("Rating: " + rating);
    //                  var personImage = $("<img>");
    //                  personImage.attr("src", results[i].images.fixed_height.url);
    //                  gifDiv.append(p);
    //                  gifDiv.append(personImage);
    //                  $("#gif-display").prepend(gifDiv)
    //              }
    //          });
    //  });
 });