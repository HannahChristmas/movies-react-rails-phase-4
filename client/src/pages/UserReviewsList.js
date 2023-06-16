import { Box, Button, Input, Movie } from "../styles";
import { useState } from "react"

function UserReviewsList({user, movies, setMovies}) {
  const [newReview, setNewReview] = useState("")
  const [movieBeingEdited, setMovieBeingEdited] = useState(null)
  const [toggleReviewPopup, setToggleReviewPopup] = useState(false)

  const togglePopup = (id) => {
    if(id === movieBeingEdited) {
      setMovieBeingEdited(null)
    } else {
      setMovieBeingEdited(id)
    }
    setToggleReviewPopup((toggleReviewPopup) => !toggleReviewPopup);
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
        const foundMovie = movies.find((mov) => {
          const reviewsArray = mov.movies_with_reviews
          const foundReview = reviewsArray.find((rev) => rev.review_id === parseInt(id))
           if(foundReview){
            return true
           } else {
            return false
           }
        })

        const updatedReviews = foundMovie.movies_with_reviews.map((review) => review.review_id === individualReview.review_id ? individualReview : review)
        foundMovie.movies_with_reviews = updatedReviews

        const newMovies = movies.map(mov => {
          if (foundMovie.id === mov.id){
            return foundMovie
          } else {
            return mov
          }
        })
        setMovies(newMovies)
        setMovieBeingEdited(null)
      })
      }
     })
  }

  return (
    <>
      <div id="all-movies-container">
        {movies.map((mov) => mov.movies_with_reviews.map((rev) => {
      if (rev.username === user.username) {
        return (
          <Movie key={mov.id}>
          <Box>
            <img className="poster" alt={mov.title} src={mov.image_url}></img>
            <p>{mov.genre}&nbsp; · &nbsp; {mov.year} &nbsp;·&nbsp; {mov.director}<br></br></p>
            <p><b>MY REVIEW:</b> {rev.review_content}</p>
            <button id="edit-button" onClick={() => togglePopup(mov.id)}> ✏ </button>
            {movieBeingEdited === mov.id && (
              <div id="popup-overlay">
                <div id="popup-content">
                  <Button id="close-button" onClick={togglePopup}>X</Button>
                  <form>
                    <Input
                      type="text"
                      id="review"
                      //value={rev.review_content}
                      onChange={(e) => setNewReview(e.target.value)}
                    />
                    <div id="delete-post-div">
                      <Button id="delete-button" onClick={() => handleDeleteReview(rev.review_id)}>DELETE</Button>     
                      <Button onClick={(e) => handleUpdateReview(e, rev.review_id)} color="primary" type="submit">
                      POST
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
              )
            }  
          </Box>
          </Movie>
        )
      }
    }))}
    
      </div>
    </>
  );
}

export default UserReviewsList;
