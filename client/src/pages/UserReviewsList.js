import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
// import { useParams } from "react-router";
// import UserMovieReview from "./UserMovieReview";


function UserReviewsList({user}) {

  const [userReviews, setUserReviews] = useState([]);
  // const { id } = useParams();

  useEffect(() => {
    fetch("/myreviews")
    .then(r => r.json())
    .then(userReviews => setUserReviews(userReviews))
  }, [])

// function handleDeleteReview(id) {
//     const updatedReviewsArray = userReviews.reviews.filter((review) => review.id !== id);
//     setUserReviews(updatedReviewsArray)
// }

  return (
    <Wrapper>
        {userReviews.map((review) => (
          <Movie key={review.id}>
            <Box>
                <img className="poster" alt={review.movie.title}src={review.movie.image_url}/>
              <h2>{review.movie.title}</h2>
              <p>
                <em><b>Genre:</b> {review.movie.genre}</em>
                &nbsp;·&nbsp;
                <cite><b>Year:</b> {review.movie.year}</cite>
                &nbsp;·&nbsp;
                <cite><b>Director:</b> {review.movie.director}</cite><br></br><br></br>
              </p>
              <Box>
                <h1>My Review:</h1>
                <p>{review.review_content}</p>
                <button>Edit Review</button> <button>Delete Review</button>

              </Box>
            </Box>  
          </Movie>
        ))
      }
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
