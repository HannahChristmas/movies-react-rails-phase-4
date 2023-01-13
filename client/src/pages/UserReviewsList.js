import styled from "styled-components";
import { Box } from "../styles";

function UserReviewsList({user, movies, setMovies}) {

  const handleDeleteReview = (e) => {
    console.log(movies)
    fetch(`/reviews/${e.target.name}`, {
      method: 'DELETE'
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
        const filteredReview = foundMovie.movies_with_reviews.filter((review) => {
          return review.review_id !== parseInt(clickedReview)
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
          {/* How do I get my handle delete function to here? */}
          <button name={rev.review_id} onClick={(e) => handleDeleteReview(e)}>Delete</button>
          <button>Edit</button>
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
