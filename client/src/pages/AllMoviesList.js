import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

function AllMoviesList(){
    const [allMovies, setAllMovies] = useState([]);

    useEffect(() => {
        fetch("/movies")
        .then(r => r.json())
        .then(allMovies => setAllMovies(allMovies))
      }, [])

    return (
        <Wrapper>
            {allMovies.length > 0 ? (
                allMovies.map((movie) => (
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