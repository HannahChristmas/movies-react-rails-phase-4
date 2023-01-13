// import '../App.css';
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from './Login.js'
import NavBar from './NavBar.js'
import AllMoviesList from '../pages/AllMoviesList.js'
import MovieCard from '../pages/MovieCard.js'
import UserReviewsList from "../pages/UserReviewsList";
import NewMovie from "../pages/NewMovie";

function App() {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);

  console.log("MOVIES FROM APP", movies)

  useEffect(() => {
      fetch("/movies")
      .then(r => r.json())
      .then(movies => setMovies(movies))
    }, [])

    console.log("MOVIES AFTER REFRESH", movies)


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

  return (
    <>
      <NavBar setUser={setUser}/>
      <main>
        <Routes>
        <Route path="/" element ={<AllMoviesList user={user} movies={movies} setMovies={setMovies}/>}/>
        <Route path="/movies" element ={<AllMoviesList user={user} movies={movies} />}/>
        <Route path="/movies/:id" element ={<MovieCard user={user} movies={movies} setMovies={setMovies} />}/>
        <Route path="/new" element={<NewMovie user={user} handleAddMovie={handleAddMovie} />}/>
        <Route path="/reviews" element={<UserReviewsList user={user} movies={movies} setMovies={setMovies}/>}/>
        </Routes>
      </main>
    </>
  );
}

export default App;
