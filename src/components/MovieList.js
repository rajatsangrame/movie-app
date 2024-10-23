import React from "react";

const MovieList = (props) => {
    const baseUrl = 'https://image.tmdb.org/t/p/original/'
    return (
        <>
            {
                props.movies.map((movie, index) =>
                    <div key={movie.id}
                        className="d-flex justify-content-start m-3"
                        style={{ width: '200px', height: '300px' }}>
                        <img src={`${baseUrl}${movie.poster_path}`} alt="movie" />
                    </div>)
            }
        </>
    )
}

export default MovieList;
