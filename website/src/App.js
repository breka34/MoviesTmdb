import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Movie from './components/Movie';
import './components/Movies.css';
  import tmdb from './assets/tmdb.jpg'
 import './components/Search.css'
 

function App() {
  const API_URL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=f55ef2a80d4ef73f63457dd73185229e&page=1";
const IMG_API = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
    "https://api.themoviedb.org/3/search/movie?&api_key=f55ef2a80d4ef73f63457dd73185229e&query=";

  const [movies, setMovies] = useState([])
 const [search, setSearch] = useState('');

 const onSubmit = (e) => {
        e.preventDefault();
        if(search) {
          getMovies(SEARCH_API + search)
        }
      }
      const handleChange = e => {
        setSearch(e.target.value);
      }

  useEffect(() => {
   getMovies(API_URL)
      
},[])
function reset () {
  window.location.reload(false);
}

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}
const getMovies = (API) => {
  fetch(API)
   .then((res) => res.json())
   .then((data) => {
     console.log(data)
     setMovies(data.results)
   })
}
  return (
    <>
    <header>
        <div className="logo">
          <img src={tmdb} onClick={reset} />
        </div>
      <form onSubmit={onSubmit}>
          <input className="search" type="text" 
          placeholder="Search..."
          value={search}
          onChange={handleChange}
          
          />
      </form>
    </header>
      <div className="movie-container">
        {movies.length > 0 && movies.map((movie) => (
          <Movie key={movie.id} {...movie}/>
        ))}
        </div>
        
       
    </>
  );
}

export default App;
