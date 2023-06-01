import styled from "styled-components";
import { Box, Button, Input, Label } from "../styles";
import { useState } from "react"

function UserReviewsList({user, movies, setMovies}) {
  const [newReview, setNewReview] = useState("")
  const [movieBeingEdited, setMovieBeingEdited] = useState(null)
 
  const toggleReview = (id) => {
    if(id === movieBeingEdited) { 
      setMovieBeingEdited(null)
    } else { 
      setMovieBeingEdited(id)
    }
  }

  const handleDeleteReview = (id) => {
    fetch(`/reviews/${id}`, {
      method: 'DELETE'
    })
    .then(r => {
      if (r.ok) {
        const foundMovie = movies.find((mov) => {
          const reviewsArray = mov.movies_with_reviews
          const foundReview = reviewsArray.find((rev) => rev.review_id === parseInt(id))
           if(foundReview){
            return foundReview
           } else {
            return false
           }
        })
        const filteredReview = foundMovie.movies_with_reviews.filter((review) => {
          return review.review_id !== parseInt(id)
        })
        foundMovie.movies_with_reviews = filteredReview
        const newMovies = movies.map(mov => {
          if (foundMovie.id === mov.id){
            return foundMovie
          } else {
            return mov
          }
        })
        setMovies(newMovies)
      }
    })
  }

  const handleUpdateReview = (e, id) => {
    e.preventDefault()
    const addReview = {review_content: newReview}
    fetch(`/reviews/${id}`, {
      method: "PATCH", 
      headers: {
        "Content-Type" : "application/json"
      }, 
      body: JSON.stringify(addReview)
    })
     .then(r => {
      if (r.ok) {
      r.json().then(data => {
        const individualReview = {
          review_id: data.id,
          review_content: data.review_content,
          username: data.user.username,
        }
        // individualReview = the data from the patch request

        // FOUND MOVIE IS: allMovies.movies_with_reviews.CURRENTREVIEW

        // look through all of the movies to find the movie where
        const foundMovie = movies.find((mov) => {

          // the movie.movies_with_reviews 
          const reviewsArray = mov.movies_with_reviews

          // has a review id that matches the id of the review we are fucking with
          const foundReview = reviewsArray.find((rev) => rev.review_id === parseInt(id))
           if(foundReview){
            return true
           } else {
            return false
           }
        })

        // the new reviews array is foundMovie where we are looking through the reviews. If it matches the data, return the data. Else return the original review
        const updatedReviews = foundMovie.movies_with_reviews.map((review) => review.review_id === individualReview.review_id ? individualReview : review)
        foundMovie.movies_with_reviews = updatedReviews

        // all the movies but with the new shit
        const newMovies = movies.map(mov => {
          if (foundMovie.id === mov.id){
            return foundMovie
          } else {
            return mov
          }
        })
        console.log("NEW MOVIES pre setMovies:", newMovies)
        setMovies(newMovies)
        console.log("NEW MOVIES POST setMovies:", newMovies)


        setMovieBeingEdited(null)

      })
      
      }
      
     })
  }

  return (
    <Wrapper>
      {movies.map((mov) => mov.movies_with_reviews.map((rev) => {
    if (rev.username === user.username) {
      return (
        <Movie key={mov.id}>
        <Box>
          <img className="poster" alt={mov.title} src={mov.image_url}></img>
          <h1>{mov.title}</h1>
          <p>
            <em><b>Genre:</b> {mov.genre}</em>
            &nbsp;·&nbsp;
            <cite><b>Year:</b> {mov.year}</cite>
            &nbsp;·&nbsp;
            <cite><b>Director:</b> {mov.director}</cite><br></br><br></br>
          </p>
          <p><em><b>My review:</b></em> {rev.review_content}</p>
          <button onClick={() => handleDeleteReview(rev.review_id)}>Delete</button>
          <button onClick={() => toggleReview(mov.id)}>Edit</button>
          {movieBeingEdited === mov.id ? 
                            <form>
                            <Label htmlFor="title">Review</Label>
                            <Input
                              type="text"
                              id="review"
                              onChange={(e) => setNewReview(e.target.value)}
                            />
                                <Button onClick={(e) => handleUpdateReview(e, rev.review_id)} color="primary" type="submit">
                                 Submit Review
                                </Button>
                            </form>
                              : null
                        }  
        </Box>
        </Movie>
      )
    }
  }))}
  
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
  text-align: center;
`;

const Movie = styled.article`
  margin-bottom: 24px;
`;

export default UserReviewsList;
