// import zIndex from "@mui/material/styles/zIndex";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Box } from "../styles";
import NewReview from './NewReview.js'
import { Button, Input, Label, Wrapper } from "../styles";

function MovieCard( {user, setUser, movies, setMovies } ) {
    const { id } = useParams();   
    const [movie, setMovie] = useState({});
    const [updateReview, setUpdateReview] = useState("")
    const [toggleUpdateReview, setToggleUpdateReview] = useState(false)
    const [userMovies, setUserMovies] = useState(user.movies)
    const [status, setStatus] = useState("pending")

    const userReview = movie.movies_with_reviews?.find(review => review.username === user.username)
    console.log("userReview: ", userReview)    
    console.log("userReviewContent:", userReview?.review_content)

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
        // the body I'm sending
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
            const individualReview ={
                review_id: data.id, 
                review_content: data.review_content,
                username: data.user.username,
            }
          const updatedReviews = movie.movies_with_reviews.map(review => review.review_id === individualReview.review_id ? individualReview : review)
          movie.movies_with_reviews = updatedReviews 
          setMovie({...movie})
          const newMovies = movies.map(mov => {
            if ( movie.id === mov.id ){
                return movie
            } else {
                return mov
            }
        })

        // const userMovies = user.newMovies

        setMovies(newMovies)
        setToggleUpdateReview(false)    
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
                            <p>{userReview.review_content}</p>
                            <button onClick={() => setToggleUpdateReview(toggle => !toggle)}>✏</button>
                        </div>
                        <div id="review-toggle-div">
                        {toggleUpdateReview ? 
                                <form>
                                <Input
                                    type="text"
                                    id="review"
                                    value={updateReview}
                                    onChange={(e) => setUpdateReview(e.target.value)}
                                />
                                    <Button onClick={(e) => handleUpdateReview(e, userReview.review_id)} color="primary" type="submit">
                                    Submit Review
                                    </Button>
                                    <button onClick={() => handleDelete(userReview.review_id)}>Delete</button>     
                                </form>
                                : null
                        }
                        </div>
                    </Box>    
                    </> 
                    :
                    <NewReview handleAddReview={handleAddReview} movieId={movie.id} userId={user.id} user={user} setUser={setUser} movies={movies}></NewReview>
                }

                {movie.movies_with_reviews?.map((review) => (
                    review.username !== user.username && (
                        <Box id="review-card" key={review.review_id}>
                            {review.review_content}<br></br><br></br>
                            by: <em>{review.username}</em><br></br>
                        </Box>
                    )
                ))}
            
            </Box>
        </Wrapper>
        </div>
    )
}

export default MovieCard;