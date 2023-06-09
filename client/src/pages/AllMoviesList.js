import { Link } from "react-router-dom";
// import styled from "styled-components";
import { Box, Button, Wrapper, Movie } from "../styles";

function AllMoviesList({movies}){

    return (
        <div class="movie-container">
            {/* <h1 id="logo-h1">Seen It</h1> */}
            <Wrapper>
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <Movie key={movie.id}>
                            <Box>
                            <img className="poster" alt={movie.title}src={movie.image_url}/>
                            <h2>{movie.title}</h2>
                            <p>
                                {movie.genre} &nbsp;·&nbsp; {movie.year} <br></br>
                                <b>Director:</b> {movie.director}<br></br><br></br>
                            </p>
                            <Link id="reviews-link" to={`/movies/${movie.id}`}>reviews</Link>
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
        </div>
    )
}



export default AllMoviesList;