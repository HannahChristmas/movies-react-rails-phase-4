// import zIndex from "@mui/material/styles/zIndex";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { Box } from "../styles";
import NewReview from './NewReview.js'
import { Button, Input, Label } from "../styles";

function MovieCard( {user, setUser, movies, setMovies } ) {
    const { id } = useParams();   
    const [movie, setMovie] = useState({});
    const [newReview, setNewReview] = useState("")
    const [toggleNewReview, setToggleNewReview] = useState(false)
    const [userMovies, setUserMovies] = useState(user.movies)
    const [status, setStatus] = useState("pending")
    const foundMovie = movies.find(mov => mov.id === parseInt(id))
    
    useEffect(() => {
        if (foundMovie) {
            setMovie(foundMovie)
            setStatus("found")
        } else {
            setStatus("rejected")
        }
    }, [id, movies, foundMovie])

    function handleAddReview(updatedReviews) {
        foundMovie.movies_with_reviews = updatedReviews
        setMovie({...foundMovie})
        const newMovies = movies.map(mov => {
            if (foundMovie.id === mov.id){
                return foundMovie
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
            foundMovie.movies_with_reviews = filteredReview 
            setMovie({...foundMovie})
            const newMovies = movies.map(mov => {
                if ( foundMovie.id === mov.id ){
                    return foundMovie
                } else {
                    return mov
                }
            })
            const userUpdatedMovies = userMovies.filter(mov => foundMovie.id !== mov.id)
            setMovies(newMovies)
            setUser({...user, movies: userUpdatedMovies})
          }
        })
      }

      function handleUpdateReview(e, id) {
        e.preventDefault()
        const addReview = {review_content: newReview}
        fetch(`/reviews/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(addReview)
        })  
        .then(r => r.json())
        .then(data => {
            const individualReview ={
                review_id: data.id, 
                review_content: data.review_content,
                username: data.user.username,
            }
          const updatedReviews = foundMovie.movies_with_reviews.map(review => review.review_id === individualReview.review_id ? individualReview : review)
          foundMovie.movies_with_reviews = updatedReviews 
          setMovie({...foundMovie})
          const newMovies = movies.map(mov => {
            if ( foundMovie.id === mov.id ){
                return foundMovie
            } else {
                return mov
            }
        })

        // const userMovies = user.newMovies

        setMovies(newMovies)
        setToggleNewReview(false)    
    })
    }

    if (status === "pending") return <h2>Loading...</h2>;
    if (status === "rejected") return <h2>Error: Movie doesn't exist</h2>;

    function hasUserReviewedThis(param1) {
        let result = false
        param1.movies_with_reviews.forEach((item) => {
            if(item.username === user.username) {
                result = true;
            }
        })
        return result;
    }

    return (
        <Wrapper>
            <Box>
                <img className="poster" alt={movie.title}src={movie.image_url}/>
                <h1>{movie.title}</h1>
                <h1>{movie.genre}</h1>
                <h1>{movie.year}</h1>
            </Box>
            <Box>
                {hasUserReviewedThis(foundMovie)
                    ? null 
                    :
                    <NewReview handleAddReview={handleAddReview} movieId={movie.id} userId={user.id} user={user} setUser={setUser} movies={movies}></NewReview>
                }

                {movie.movies_with_reviews?.map((review) => (
                    <Box key={review.review_id}>
                        {review.review_content}<br></br><br></br>
                        by: <em>{review.username}</em><br></br>
                        {review.username === user.username ?
                        <>
                            <button onClick={() => handleDelete(review.review_id)}>Delete</button>     
                            <button onClick={() => setToggleNewReview(toggle => !toggle)}>Edit your Review</button>
                            {toggleNewReview ? 
                            <form>
                            <Label htmlFor="title">Review</Label>
                            <Input
                              type="text"
                              id="review"
                              value={movie.review_content}
                              onChange={(e) => setNewReview(e.target.value)}
                            />
                                <Button onClick={(e) => handleUpdateReview(e, review.review_id)} color="primary" type="submit">
                                 Submit Review
                                </Button>
                            </form>
                              : null
                        }    
                        </>
                            : null
                    }
                    </Box>
                ))}
            
            </Box>
        </Wrapper>
    )
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
  text-align: center;
`;

export default MovieCard;