$("#searchBar").on("keydown",(event)=>{
   if(event.key === "Enter"){
       fetchMovie($("#searchBar").val())
   }



})
async function fetchMovie(movieName) {
    try {
        let response = await fetch("https://yts.mx/api/v2/list_movies.json?query_term=" + movieName);
        let movieData = await response.json();
        $("body").css("background-image", "url(" + "" + ")");
        $("#searchBar").remove();
        $("#title").remove();

        $("body").append("<img src='"+movieData.data.movies[0].large_cover_image+"' class='moviePoster'>")

    } catch (e) {
        swal(" :( ","Movie not found!"+e, "error")
    }
}

