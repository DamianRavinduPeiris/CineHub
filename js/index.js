/*
$(document).ready(async () => {
    try {
        let response = await fetch("https://yts.mx/api/v2/list_movies.json");
        let movieData = await response.json();
        let  movies= movieData.data.movies;
        console.log(movies);
        movies.map((m)=>{
            $("body").append("<img src='"+m.large_cover_image+"'>")
        })

    } catch (e) {
        alert("Something went wrong!"+e)
    }
});*/
