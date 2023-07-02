$("#searchBar").on("keydown", (event) => {
    if (event.key === "Enter") {
        fetchMovie($("#searchBar").val())
    }


})

async function fetchMovie(movieName) {
    try {
        let response = await fetch("https://yts.mx/api/v2/list_movies.json?query_term=" + movieName);
        let movieData = await response.json();
        $("#searchBar").remove();
        $("#title").css("color", "black");
        $("#title").addClass("animate__animated animate__bounceInDown");
        const movieBackground = movieData.data.movies[0].background_image_original;
        $("body").css({
            "background": `url(${movieBackground})`,
            "background-size": "cover",
            "background-repeat": "no-repeat",
            "background-position": "center"
        });


        $(".moviePoster").append("<img src='" + movieData.data.movies[0].large_cover_image + "' class='animate__animated animate__rubberBand'>")
        $(".moviePoster").append("<div class='movieDetails'>"+"<h1 class='animate__animated animate__zoomInDown'>"+movieData.data.movies[0].title + "." +"</h1>"+"</div>")
        $(".movieDetails").append("<h2 class='animate__animated animate__zoomInDown'>"+"Released : "+movieData.data.movies[0].year + "." +"</h2>")




        if (window.innerWidth < 606) {
            $(".moviePoster").css("align-self", "center");

        }

    } catch (e) {
        swal(" :( ", "Movie not found!" + e, "error")
    }


}

if (window.innerWidth < 594) {
    $("#searchBar").attr("placeholder", "Search for a movie!");

}
if (window.innerWidth < 994) {
    $("#title").css("color", "black");
    $("body").css("background", "none");

}

