import { Box, Button, Input, Movie } from "../styles";
import { useState } from "react"

function UserReviewsList({user, movies, setMovies, userMovies, movie, setMovie, toggleReviewPopup, setToggleReviewPopup}) {
  const [updateReview, setUpdateReview] = useState("")
  // const [toggleReviewPopup, setToggleReviewPopup] = useState(false)

  const togglePopup = (mov) => {
    setMovie(mov)
    setToggleReviewPopup((toggle) => !toggle);
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
        console.log("userMovies after: ", userMovies)
    })   
}

console.log("userMovies before: ", userMovies)

  return (
    <>
      <div id="all-movies-container">
        {userMovies.map((mov) => {
          const userReviews = mov.movies_with_reviews.filter((rev) => rev.username === user.username);
        
        return userReviews.map((rev) => (
          <Movie key={mov.id}>
          <Box>
            <img className="poster" alt={mov.title} src={mov.image_url}></img>
            <p>{mov.genre}&nbsp; · &nbsp; {mov.year} &nbsp;·&nbsp; {mov.director}<br></br></p>
            <p><b>MY REVIEW:</b> {rev.review_content}</p>
            <button id="edit-button" onClick={() => togglePopup(mov)}> ✏ </button>
            {toggleReviewPopup && (
              <div id="popup-overlay">
                <div id="popup-content">
                  <Button id="close-button" onClick={togglePopup}>X</Button>
                  <form>
                    <Input
                      type="text"
                      id="review"
                      // value={rev.review_content}
                      onChange={(e) => setUpdateReview(e.target.value)}
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
              )}  
          </Box>
          </Movie>
        ));
      })}
      </div>
    </>
  );
}

export default UserReviewsList;
