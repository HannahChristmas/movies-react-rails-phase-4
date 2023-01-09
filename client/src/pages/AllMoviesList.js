import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

function AllMoviesList({movies}){

    return (
        <Wrapper>
            {movies.length > 0 ? (
                movies.map((movie) => (
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
                        {/* Send the param of movie */}
                        {/* Too many fetches. Fewer the better. */}
                        {/* Can I not link this directly to a component so that I can pass stuff down to it??? */}
                        <Link to={`/movies/${movie.id}`}>Reviews</Link>
                        {/* <Link to={<MovieCard></MovieCard>}>Reviews</Link> */}

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