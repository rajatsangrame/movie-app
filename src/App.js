

import React, { useEffect, useState } from 'react';
import MovieList from './components/MovieList';
import axios from 'axios';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';


const App = () => {

  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const searchMovies = async (searchQuery) => {

    const url = `https://api.themoviedb.org/3/search/movie?language=en-US&page=1&query=${searchQuery}`
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NGRkMWEwNzFjMjc3NDQ3MmVlOWZhMGJhNGU3NmE3YSIsIm5iZiI6MTcyNTA5NDM0NS4wNTg3MDMsInN1YiI6IjVkZjdhZWZhYTZkOTMxMDAxNGRjMjgzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w7ngB59xrGJk2ljMM25kr91c_YaH8KUUh03facv3-Ek` // Replace with your actual token
      }
    });
    setMovies(response.data.results);
  }

  useEffect(() => {
    searchMovies(searchQuery);
  }, [searchQuery])

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex allgin-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies' />
        <SearchBox
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}>
        </SearchBox>
      </div>
      <div className='row'>
        <MovieList movies={movies} />
      </div>
    </div>
  );
}

export default App;
