import { Link } from "react-router-dom";
import { Box, Button, Movie } from "../styles";

function AllMoviesList({movies}){

    return (
        <div>
            <div id="all-movies-container">
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
            </div>
        </div>
    )
}



export default AllMoviesList;