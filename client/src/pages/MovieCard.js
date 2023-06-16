import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Box } from "../styles";
import NewReview from './NewReview.js'
import { Wrapper } from "../styles";
import ToggleReviewPopup from "../components/ToggleReviewPopup";

function MovieCard( {user, setUser, movies, setMovies, userMovies, movie, setMovie, toggleReviewPopup, setToggleReviewPopup } ) {
    const { id } = useParams();   
    const [status, setStatus] = useState("pending")

    const userReview = movie.movies_with_reviews?.find(review => review.username === user.username)

    useEffect(() => {
        fetch(`/movies/${id}`)
        .then(r => r.json())
        .then(movie => {
            setMovie(movie)
            setStatus("found")
        })

    }, [id, setMovie])

    const togglePopup = () => {
        setToggleReviewPopup((toggle) => !toggle);
    }

    function handleAddReview(updatedReviews) {
        movie.movies_with_reviews = updatedReviews
        setMovie({...movie})
        const newMovies = movies.map(mov => {
            if (movie.id === mov.id){
                return movie
            } else {
                return mov
            }
        })
        setMovies(newMovies)
    }

    if (status === "pending") return <h2>Loading...</h2>;
    if (status === "rejected") return <h2>Error: Movie doesn't exist</h2>;
   
    return (
        <div className="movie-container">
        <Wrapper>
            <Box id="movie-card-left">
                <img className="poster" alt={movie.title}src={movie.image_url}/>
                <h1>{movie.genre} • {movie.year}</h1>
                <h3>{movie.director}</h3>
            </Box>
            <Box id="movie-card-right">
                {userReview
                    ? 
                    <>
                    <Box id="review-card">
                        <div id="user-review-content">
                            <h3>{userReview.review_content}</h3>
                            <button id="edit-button" onClick={togglePopup}> ✏ </button>
                        </div>
                        {toggleReviewPopup && (
                            <ToggleReviewPopup movie={movie} setMovie={setMovie} setToggleReviewPopup={setToggleReviewPopup} movies={movies} setMovies={setMovies} user={user} setUser={setUser} userMovies={userMovies}/>
                        )}
                    </Box>    
                    </> 
                    :
                    <NewReview handleAddReview={handleAddReview} movieId={movie.id} userId={user.id} user={user} setUser={setUser} movies={movies}></NewReview>
                }

                {movie.movies_with_reviews?.map((review) => (
                    review.username !== user.username && (
                        <Box id="review-card" key={review.review_id}>
                            <h3>{review.review_content}</h3>
                            <p><em>by: {review.username}</em></p>
                        </Box>
                    )
                ))}
            </Box>
        </Wrapper>
        </div>
    )
}

export default MovieCard;