import fetch from "node-fetch"

const getMovies = async ()=>{
    const BASEURL = `https://yts.mx/api/v2/list_movies.json`;
    const movies = await fetch(BASEURL,{
        
    });
    console.log(movies);
}

export const showMovies =  (req,res) =>{
    //getMovies();
    res.send("movie home");
}

export const movieInformation = (req,res)=>{
    res.send("movie detail");
}