// import zIndex from "@mui/material/styles/zIndex";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { Box } from "../styles";
import NewReview from './NewReview.js'
import { Button, Input, Label } from "../styles";


function MovieCard( {user, movies, setMovies } ) {
    const { id } = useParams();   
    const [movie, setMovie] = useState({});
    const [newReview, setNewReview] = useState("")
    const [toggleNewReview, setToggleNewReview] = useState(false)

    const [status, setStatus] = useState("pending")
    const foundMovie = movies.find(mov => mov.id === parseInt(id))
    console.log(foundMovie)
    
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
        console.log(movies)
        fetch(`/reviews/${id}`, {
          method: 'DELETE'
        })
        .then(r => {
          if (r.ok) {
            const filteredReview = movie.movies_with_reviews.filter(review => {
                return review.review_id !== id
            })
            foundMovie.movies_with_reviews = filteredReview 
        // we wrap it in the curly braces to make a new object. If we don't wrap it, we only get the keys. 
            setMovie({...foundMovie})
            const newMovies = movies.map(mov => {
                if ( foundMovie.id === mov.id ){
                    return foundMovie
                } else {
                    return mov
                }
            })
            setMovies(newMovies)
          }
        })
      }

      function handleUpdateReview(id) {
        console.log("Suppy")
        const addReview = {review_content: newReview}
        //find 
        // const individualReviewId = foundMovie.movie_with_reviews.find(rev => rev.review_id === )
        fetch(`/reviews/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(addReview)
        })  
        .then(r => r.json())
        .then(console.log("ADDREVIEW", addReview))
        .then(newReview => {
          const updatedReview = foundMovie.movies_with_reviews.map(review => review.id === newReview.id ? newReview : review)
          foundMovie.movies_with_reviews = updatedReview 
          setMovie({...foundMovie})
        })
        // alert("BUTTS BUTTS BUTTS BUTTS")
    }

    

    if (status === "pending") return <h2>Loading...</h2>;
    // Don't want another fetch request just for errors. 
    if (status === "rejected") return <h2>Error: Movie doesn't exist</h2>;

    function hasUserReviewedThis(param1) {
        let result = false
        param1.movies_with_reviews.forEach((item) => {
            if(item.user_id === user.id) {
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
                    <NewReview handleAddReview={handleAddReview} movieId={movie.id} userId={user.id}></NewReview>
                }

                {movie.movies_with_reviews?.map((review) => (
                    <Box key={review.review_id}>
                        {review.review_content}<br></br><br></br>
                        by: <em>{review.username}</em><br></br>
                        {review.user_id === user.id ?
                        <>
                        {/* Instead of this being a button, make it a JSX to a button  */}
                            {/* <DeleteReview handleDelete={handleDelete} review={review.review_id}></DeleteReview> */}
                            <button onClick={() => handleDelete(review.review_id)}>Delete</button>     
                            <button onClick={() => setToggleNewReview(toggle => !toggle)}>Edit your Review</button>
                            {toggleNewReview ? 
                            <form>
                            {/* <Box> */}
                            <Label htmlFor="title">Review</Label>
                            <Input
                              type="text"
                              id="review"
                            //   defaultValue={movie.review_content}
                              value={movie.review_content}
                              onChange={(e) => setNewReview(e.target.value)}
                            />
                                <Button onClick={() => handleUpdateReview(review.review_id)} color="primary" type="submit">
                                 Submit Review
                                </Button>
                            {/* </Box> */}
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