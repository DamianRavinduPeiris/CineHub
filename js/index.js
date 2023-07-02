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
        $(".moviePoster").append("<div class='movieDetails'>" + "<h1 class='animate__animated animate__zoomInDown'>" + movieData.data.movies[0].title + "." + "</h1>" + "</div>")
        $(".movieDetails").append("<h2 class='animate__animated animate__zoomInDown'>" + "Released : " + movieData.data.movies[0].year + "." + "</h2>")
        $(".movieDetails").append("<h2 class='animate__animated animate__zoomInDown'>" + "Language  : " + movieData.data.movies[0].language + "." + "</h2>")
        $(".movieDetails").append("<h2 class='animate__animated animate__zoomInDown'>" + "Genres  : " + movieData.data.movies[0].genres + "." + "</h2>")
        $(".movieDetails").append("<h2 class='animate__animated animate__zoomInDown'>" + "Runtime  : " + movieData.data.movies[0].runtime + "mins." + "</h2>")
        $(".movieDetails").append("<a href=" + movieData.data.movies[0].torrents[0].url + "><button class='btn btn-dark' type='button'>" + "720p" + "</button>")
        /*Some movies do not have above 720p.*/
        if (movieData.data.movies[0].torrents[1]) {
            $(".movieDetails").append("<a href=" + movieData.data.movies[0].torrents[1].url + "><button class='btn btn-dark' type='button'>" + "1080p" + "</button>")

        }
        else {
            swal(":(", "We do not have 1080p!", "error")

        }
        if (movieData.data.movies[0].torrents[2]) {
            $(".movieDetails").append("<a href=" + movieData.data.movies[0].torrents[2].url + "><button class='btn btn-dark' type='button'>" + "2160p" + "</button>")
        }else{
            swal(":(", "We do not have 2160p!", "error")
        }


        /*In smaller screens the movie poster must be aligned to the center.*/
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

