import { useEffect, useState } from "react";
import styled from "styled-components";
import { Box } from "../styles";
// import { useParams } from "react-router";


function UserReviewsList({user}) {

  const [userReviews, setUserReviews] = useState([]);
  const [reviewContent, setReviewContent] = useState("");
  const [errors, setErrors] = useState([]);
  // const { id } = useParams();    
  // const individualReview = user.reviews.find(rev => rev.id === id)

  useEffect(() => {
    fetch("/reviews")
    .then(r => r.json())
    .then(userReviews => setUserReviews(userReviews))
  }, [])

  const handleDelete = (id) => {
    fetch(`/reviews/${id}`, {
      method: 'DELETE'
    })
    .then(r => {
      if (r.ok) {
        const filteredReview = userReviews.filter(review => review.id !== id)
        setUserReviews(filteredReview)
      }
    })
  }

  const handleEdit = (e) => {
    e.preventDefault();
    console.log("Doesn't work")
    // const newReview = {review_content: reviewContent}
    // fetch(`/myreviews/${id}`, {
    //   method: 'PATCH',
    //   headers: {
    //     "Content-Type": "application/json",
    //   }, 
    //   body: JSON.stringify(newReview)
    // })
    // .then(r => {
    //   if (r.ok) {
    //     const filteredReview = userReviews.map(review => review.id === newReview.id ? newReview : review )
    //     setUserReviews(filteredReview)
    //   }
    // })
  }

  // if review.length = 0, add a review button or something

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
                {/* Anonymous function pointing to onDeleteClick */}
                <button onClick={() => handleDelete(review.id)}>Delete Review</button><br></br><br></br>
                {/* Form that appears when you click on edit review */}
                <form onSubmit={() => handleEdit(review.id)}>
                  <div>
                    <label htmlFor="review">Review</label>
                    <input
                      type="text"
                      id="review"
                      value={reviewContent}
                      onChange={(e) => setReviewContent(e.target.value)}
                    />
                  </div>
                  {errors?.map((err) => (
                    <p key={err} style={{ color: "red" }}>
                      {err}
                    </p>
                  ))}
                  <button type="submit">Submit</button>
                </form>
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
