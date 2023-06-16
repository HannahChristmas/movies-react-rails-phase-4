// import zIndex from "@mui/material/styles/zIndex";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Box } from "../styles";
import NewReview from './NewReview.js'
import { Button, Input, Wrapper } from "../styles";

function MovieCard( {user, setUser, movies, setMovies, userMovies } ) {
    const { id } = useParams();   
    const [movie, setMovie] = useState({});
    const [updateReview, setUpdateReview] = useState("")
    const [toggleReviewPopup, setToggleReviewPopup] = useState(false)
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

    useEffect(() => {
        if (userReview) {
            setUpdateReview(userReview.review_content)
        }
    }, [userReview])

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

    function handleDelete(id) {
        fetch(`/reviews/${id}`, {
          method: 'DELETE'
        })
        .then(r => {
          if (r.ok) {
            const filteredReview = movie.movies_with_reviews.filter(review => {
                return review.review_id !== id
            })
            movie.movies_with_reviews = filteredReview 
            setMovie({...movie})
            const newMovies = movies.map(mov => {
                if ( movie.id === mov.id ){
                    return movie
                } else {
                    return mov
                }
            })
            const userUpdatedMovies = userMovies.filter(mov => movie.id !== mov.id)
            setMovies(newMovies)
            setUser({...user, movies: userUpdatedMovies})
          }
        })
      }

      function handleUpdateReview(e, id) {
        e.preventDefault()
        const updatedReviewBody = {review_content: updateReview}
        
        fetch(`/reviews/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(updatedReviewBody)
        })  
        .then(r => r.json())
        .then(data => {
            const individualReview = {
                review_id: data.id, 
                review_content: data.review_content,
                username: data.user.username,
            };

            const updatedReviews = movie.movies_with_reviews.map(review => review.review_id === individualReview.review_id ? individualReview : review)
            movie.movies_with_reviews = updatedReviews 

            setMovie({...movie})
            const newMovies = movies.map((mov) => (mov.id === movie.id ? movie : mov));
            setMovies(newMovies);
            setToggleReviewPopup(false); 
        })   
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
                            <div id="popup-overlay">
                                <div id="popup-content">
                                    <Button id="close-button" onClick={togglePopup}>X</Button>
                                    <form>
                                    <Input
                                        type="text"
                                        id="review"
                                        value={updateReview}
                                        onChange={(e) => setUpdateReview(e.target.value)}
                                    />
                                    <div id="delete-post-div">
                                        <Button id="delete-button" onClick={() => handleDelete(userReview.review_id)}>DELETE</Button>     
                                        <Button onClick={(e) => handleUpdateReview(e, userReview.review_id)} color="primary" type="submit">
                                        POST
                                        </Button>
                                    </div>
                                    </form>
                                </div>
                            </div>
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