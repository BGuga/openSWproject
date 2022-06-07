import fetch from "node-fetch"


export const movieInformation = async (req,res)=>{
    const {id}= req.params; 
    const KEY= process.env.API_KEY
    const data = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=ko-KR`)
    const info = await data.json();
    res.render('detail.pug',{siteTitle:"movie!",pageTitle:`${info.original_title}`,info})
}

export  const getDiscover = (req, res)=>{
    res.render('discover',{siteTitle:"movie!"})
}

export const postDiscover = async (req, res)=>{
    const {year, genre,rating} =  req.body
    const KEY= process.env.API_KEY
    const genreData = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}&language=en-US`)
    const genres = await genreData.json()
    const target = genres.genres.filter(index =>  index.name === genre)
    const genreId = target[0].id

    const moviesData = await fetch(`
    https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&year=${year}&vote_average.gte=${rating}&with_genres=${genreId}&with_watch_monetization_types=flatrate`,
    {
        method:"GET"
    })
    const Result = await moviesData.json()
    const movies = Result.results
    console.log(movies)
    return res.render(`discoverResult.pug`,{siteTitle:"movie!",movies})
}