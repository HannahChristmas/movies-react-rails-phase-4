// import '../App.css';
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from './Login.js'
import NavBar from './NavBar.js'
import AllMoviesList from '../pages/AllMoviesList.js'
import MovieCard from '../pages/MovieCard.js'
import UserReviewsList from "../pages/UserReviewsList";
import NewMovie from "../pages/NewMovie";
import MyMoviesList from "../pages/MyMoviesList";

function App() {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState({});
  const [toggleReviewPopup, setToggleReviewPopup] = useState(false)

  useEffect(() => {
      fetch("/movies")
      .then(r => r.json())
      .then(movies => setMovies(movies))
    }, [])

  useEffect(() => {
    fetch("/me").then((res) => {
      if (res.ok) {
        res.json().then((user) => setUser(user));
      }
    });
  }, []);

  function handleAddMovie(newMovie) {
    setMovies([newMovie, ...movies])
} 

  if (!user) return <Login onLogin={setUser}/>

  const userMovies = user.movies


  return (
    <>
      <NavBar setUser={setUser}/>
      <main>
        <Routes>
        <Route path="/" element ={ <AllMoviesList movies={movies} />}/>
        <Route path="/movies" element ={<AllMoviesList movies={movies} />}/>
        <Route path="/movies/:id" element ={<MovieCard user={user} movies={movies} setMovies={setMovies} setUser={setUser} userMovies={userMovies} movie={movie} setMovie={setMovie} toggleReviewPopup={toggleReviewPopup} setToggleReviewPopup={setToggleReviewPopup}/>}/>
        <Route path="/new" element={<NewMovie user={user} handleAddMovie={handleAddMovie} />}/>
        <Route path="/reviews" element={<UserReviewsList user={user} movies={movies} setMovies={setMovies} userMovies={userMovies} movie={movie} setMovie={setMovie} toggleReviewPopup={toggleReviewPopup} setToggleReviewPopup={setToggleReviewPopup}/>}/>
        <Route path="/my-movies" element={<MyMoviesList user={user}/>}/>
        </Routes>
      </main>
    </>
  );
}

export default App;
