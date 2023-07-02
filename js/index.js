
$("#searchBar").on("keydown", (event) => {
    if (event.key === "Enter") {
        fetchMovie($("#searchBar").val())
    }


})

async function fetchMovie(movieName) {
    try {
        let response = await fetch("https://yts.mx/api/v2/list_movies.json?query_term=" + movieName);
        let movieData = await response.json();
        $("#searchBar").css("display", "none");
        $("#title").addClass("animate__animated animate__bounceInDown");
        const movieBackground = movieData.data.movies[0].background_image_original;
        $("body").css({
            "background": `url(${movieBackground})`,
            "background-size": "cover",
            "background-repeat": "no-repeat",
            "background-position": "center",
            "background-attachment": "fixed"

        });


        $(".movieContainer").append("<img src='" + movieData.data.movies[0].large_cover_image + "' class='animate__animated animate__rubberBand'>")
        $(".movieContainer").append("<div data-aos='zoom-in' class='movieDetails'>" + "<h1 class='animate__animated animate__zoomInDown'>" + "Title : " + movieData.data.movies[0].title + "." + "</h1>" + "</div>")
        $(".movieDetails").append("<h2 data-aos='zoom-in' class='animate__animated animate__zoomInDown'>" + "Released : " + movieData.data.movies[0].year + "." + "</h2>")
        $(".movieDetails").append("<h2 data-aos='zoom-in' class='animate__animated animate__zoomInDown'>" + "Language  : " + movieData.data.movies[0].language + "." + "</h2>")


        $(".movieDetails").append("<h2 data-aos='zoom-in' class='animate__animated animate__zoomInDown'>" + "Genres  : " + movieData.data.movies[0].genres + "." + "</h2>")
        $(".movieDetails").append("<h2 data-aos='zoom-in' class='animate__animated animate__zoomInDown'>" + "Runtime  : " + movieData.data.movies[0].runtime + " mins." + "</h2>")
        $(".movieDetails").append("<p data-aos='zoom-in' class='animate__animated animate__zoomInDown'>" + "Summary  : " + movieData.data.movies[0].summary + "." + "</p>")
        $(".movieDetails").append("<a href=" + movieData.data.movies[0].torrents[0].url + "><button data-aos='zoom-in' class='btn btn-dark downloadButtons animate__animated animate__rubberBand' type='button'>" + "720p : " + movieData.data.movies[0].torrents[0].size + "</button>")
        if(window.innerWidth < 800){
            $(".myFooter").css("display", "none");

        }
        /*Some movies do not have above 720p.*/
        if (movieData.data.movies[0].torrents[1]) {
            $(".movieDetails").append("<a href=" + movieData.data.movies[0].torrents[1].url + "><button data-aos='zoom-in' class='btn btn-dark downloadButtons animate__animated animate__rubberBand' type='button'>" + "1080p : " + movieData.data.movies[0].torrents[1].size + "</button>")

        } else {
            showAlert("😩", "We do not have 1080p torrents!", "error")

        }
        if (movieData.data.movies[0].torrents[2]) {
            $(".movieDetails").append("<a href=" + movieData.data.movies[0].torrents[2].url + "><button data-aos='zoom-in' class='btn btn-dark downloadButtons animate__animated animate__rubberBand' type='button'>" + "2160p : " + movieData.data.movies[0].torrents[2].size + "</button>")
        } else {
            showAlert("😩", "We do not have 2160p torrents!", "error")
        }
        /*Appending the home button after fetching movies.*/
        $(".movieDetails").append("<a href=''><button id=homeButton class='btn btn-dark downloadButtons  animate__animated animate__rubberBand' type='button'>" + "Back to home!" + "</button>")

    } catch (e) {
        showAlert("😩", "Movie not found!", "error")
        $("#searchBar").val("");
        $("#searchBar").css("display", "block");
    }


}

if (window.innerWidth < 594) {
    $("#searchBar").attr("placeholder", "Search for a movie!");

}
if (window.innerWidth < 994) {
    $("#title").css("color", "black");
    let path = "../assets/bg2.svg"
    $("body").css({
        "background": `url(${path})`,
        "background-size": "cover",
        "background-repeat": "no-repeat",
        "background-position": "center",
        "background-attachment": "fixed"

    });

}

$(document).ready(() => {
    $(document).on("click", "#homeButton", () => {
        $("#searchBar").val("");
        $(".movieContainer").empty();

        $("body").css({
            "background": `url(${path})`,
            "background-size": "cover",
            "background-repeat": "no-repeat",
            "background-position": "center"
        });
        $("#searchBar").css("display", "block");


    });
});
$("#title").on("click",()=>{
   window.location.reload();
});

    function showAlert(title, msg, icon) {
            new swal({
                title: title,
                text: msg,
                icon: icon,

            });


    }




