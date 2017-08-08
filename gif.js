var gifs = ["Naruto","Bleach", "One Piece","Attack on Titan","Fairy Tail", "S Cry Ed", "Fullmetal Alchemist", "FLCL", "The Seven Deadly Sins"];

      function displayGifInfo() {

        var gif = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=8d9e209455dc4ffb82107eb3b0f26b7f&q=" + gif + "&limit=10&offset=0&rating=G&lang=en";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
            
            console.log(response);
            $("#gifs-view").empty();
            var results = response.data;
         
            for (var i = 0; i < results.length; i++) {
              var gifDiv= $("<div>");
              
              var gifImage= $("<img>");
              gifImage.attr("src", results[i].images.fixed_height_still.url);
              gifImage.attr("data-still",results[i].images.fixed_height_still.url);
              gifImage.attr("data-animate",results[i].images.fixed_height.url);
              gifImage.attr("data-state", "still");
              gifImage.addClass("gif3");
              var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);
                      
              gifDiv.append(p);
              gifDiv.append(gifImage);

              $("#gifs-view").prepend(gifDiv);

            };

          });


      }

       $(document).on("click",".gif3", function() {
      
          var state = $(this).attr("data-state");
          console.log(state);

      

          if (state === "still") {
            $(this).attr("src",$(this).attr("data-animate"));
            $(this).attr("data-state", "animate");


          }else{
            $(this).attr("src",$(this).attr("data-still"));
            $(this).attr("data-state", "still")
          }
    
    });

      function renderButtons() {

       
        

        $("#buttons-view").empty();
        for (var i = 0; i < gifs.length; i++) {

          var a = $("<button>");
          a.addClass("gif");
          a.attr("data-name", gifs[i]);
          a.text(gifs[i]);
          $("#buttons-view").append(a);
          $("#gif-input").val("")

        }
      }

      $("#add-gif").on("click", function(event) {
        event.preventDefault();
        var gif = $("#gif-input").val().trim();

        gifs.push(gif);

        renderButtons();

      });

      $(document).on("click", ".gif", displayGifInfo);

      renderButtons();
