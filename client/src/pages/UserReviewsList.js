import styled from "styled-components";
import { Box, Button, Input, Label } from "../styles";
import { useState } from "react"
import { useParams } from "react-router";


function UserReviewsList({user, movies, setMovies}) {
 
  const { id } = useParams();   
  const [newReview, setNewReview] = useState("")
  const [toggleNewReview, setToggleNewReview] = useState(false)


  const handleDeleteReview = (id) => {
    fetch(`/reviews/${id}`, {
      method: 'DELETE'
    })
    .then(r => {
      if (r.ok) {
        // const clickedReview = e.target.name

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
        // console.log("FILTERED REVIEW:", filteredReview)
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

  function handleUpdateReview(e) {
    e.preventDefault()
    const addReview = {review_content: newReview}
    fetch(`/reviews/${e.target.name}`, {
      method: "PATCH", 
      headers: {
        "Content-Type" : "application/json"
      }, 
      body: JSON.stringify(addReview)
    })
     .then(r => {
      if (r.ok) {
        const clickedReview = e.target.name

        const foundMovie = movies.find((mov) => {
          const reviewsArray = mov.movies_with_reviews
          const foundReview = reviewsArray.find((rev) => rev.review_id === parseInt(clickedReview))
           if(foundReview){
            return foundReview
           } else {
            return false
           }
        })
        const updatedReview = foundMovie.movies_with_reviews.map((review) => review.id === newReview.id ? newReview : review)
        foundMovie.movies_with_reviews = updatedReview
        // console.log("FILTERED REVIEW:", filteredReview)
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

  return (
    <Wrapper>
      {movies.map((mov) => mov.movies_with_reviews.map((rev) => {
    if (rev.user_id === user.id) {
      return (
        <Movie key={rev.id}>
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
          {/* Here I am never passing e back up to handleEditReview */}
          <button name={rev.review_id} onClick={() => setToggleNewReview(toggle => !toggle)}>Edit</button>
          {toggleNewReview ? 
                            <form>
                            <Label htmlFor="title">Review</Label>
                            <Input
                              type="text"
                              id="review"
                            //   defaultValue={movie.review_content}
                              value={rev.review_content}
                              onChange={(e) => setNewReview(e.target.value)}
                            />
                                <Button onClick={() => handleUpdateReview(rev.review_id)} color="primary" type="submit">
                                 Submit Review
                                </Button>
                            </form>
                              : null
                        }  
        </Box>
        </Movie>
      )
    } else {
      console.log("This don't match")
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

// const SmallPencil = styled(Pencil)`
//   height: 2.5rem;
// `

export default UserReviewsList;
