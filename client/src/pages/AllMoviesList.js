import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
import { useState } from "react";

function AllMoviesList({movies}){

    const [isAlphaClicked, setIsAlphaClicked] = useState(false)
    const [isYearClicked, setIsYearClicked] = useState(false)


    const sortedMovies = 
    movies.sort((a, b) => {
        if (isAlphaClicked){
        const nameA = a.title.toUpperCase(); 
        const nameB = b.title.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;}
        else {
            return null
        }
    })

    const moviesSortedByYear = 
    movies.sort((a, b) => {
        if (isYearClicked){
        const yearA = a.year; 
        const yearB = b.year;
        if (yearA < yearB) {
          return -1;
        }
        if (yearA > yearB) {
          return 1;
        }
        return 0;}
        else {
            return null
        }
    })
    return (
        <Wrapper>
            <button onClick={() => setIsAlphaClicked(!isAlphaClicked)}>Sort Alphabetically</button><br></br><br></br>
            <button onClick={() => setIsYearClicked(!isYearClicked)}>Sort By Year</button><br></br><br></br>

            {sortedMovies.length > 0 ? (
                sortedMovies.map((movie) => (
                    <Movie key={movie.id}>
                        <Box>
                        <img className="poster" alt={movie.title}src={movie.image_url}/>
                        <h2>{movie.title}</h2>
                        <p>
                            <em><b>Genre:</b> {movie.genre}</em>
                            &nbsp;·&nbsp;
                            <cite><b>Year:</b> {movie.year}</cite>
                            &nbsp;·&nbsp;
                            <cite><b>Director:</b> {movie.director}</cite><br></br><br></br>
                        </p>
                        <Link to={`/movies/${movie.id}`}>Reviews</Link>
                        </Box>
                    </Movie>
                ))
            ) : (
                <>
                    <h2>No Movies Found</h2>
                    <Button as={Link} to="/new">
                        Add a New Movie
                    </Button>
                </>
            )}
        </Wrapper>
    )
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
  text-align: center;
`;

const Movie = styled.article`
  margin-bottom: 24px;
`;

export default AllMoviesList;