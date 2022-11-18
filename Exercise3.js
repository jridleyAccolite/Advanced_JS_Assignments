/* Return Best movie by ‘Stanley Kubrick’
APIs -
https://dhekumar.github.io/asynchronous-javascript/
directors.json
https://dhekumar.github.io/asynchronous-javascript/
directors/4/movies.json
https://dhekumar.github.io/asynchronous-javascript/
movies/12/reviews.json */

import fetch from "node-fetch";

// find director id for 'Stanley Kubrick'
// use id to find movies by 'Stanley Kubrick'
// tally reviews for each movie
// print highest rated movie

/* I decided to use await/async along with fetch methods, as I found these easiest to read as 
the code can be written more linearly */

let directorName = 'Stanley Kubrik';    // director name to search for

async function findBestMovie(directorName){

    // find id associated with director

    const directors = await fetch('https://dhekumar.github.io/asynchronous-javascript/directors.json')
    .then(res => res.json());

    let directorId = 0;

    directors.forEach(director =>{
        if (director.name == directorName){
            directorId = director.id;
        }
    });

    // find ids of movies by director using director id

    const movies = await fetch(`https://dhekumar.github.io/asynchronous-javascript/directors/${directorId}/movies.json`)
    .then(res => res.json());

    let moviesIdName = new Map();   // map to hold movieId : movieName
    movies.forEach(movie => {
        moviesIdName.set(movie.id,movie.title); // keep for easy access to movie titles for printing
    });

    let ratingMap = new Map();   // map to hold movieId: average rating
    
    // using for(... of ...) to avoid errors with forEach that come with await/async
    for(const entry of moviesIdName){

        // calculate average ratings for each film and store in a map

        const reviews = await fetch(`https://dhekumar.github.io/asynchronous-javascript/movies/${entry[0]}/reviews.json`)
        .then(res => res.json());
        const ratings = await Promise.all(
            reviews.map(review => review.rating)
        );

        let averageRating = (ratings.reduce(((a,b) => a+b),0)) / ratings.length;
        ratingMap.set(entry[0], averageRating);
    }

    // find max average rating 
    let max = 0;
    ratingMap.forEach((value,key)=>{
        if(value > max){ max = value; }
    });

    // additional print information for debugging
    console.log("Ratings:");
    for(const movie of moviesIdName){
        console.log(`Film: ${movie[1]}, Average Rating: ${ratingMap.get(movie[0])}`);
    }
    console.log("");    // line break for spacing

    // print results

    console.log(`${directorName}'s highest rated film, with an average rating of ${max}:`)

    ratingMap.forEach((value,key)=>{
        if (value == max){
            console.log(moviesIdName.get(key));
        }
    })
}

findBestMovie(directorName);