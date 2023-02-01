import { useState } from "react";

function NewReview({ handleAddReview, userId, movieId, user, setUser, movies }){
    const [reviewContent, setReviewContent] = useState("")
    const [errors, setErrors] = useState([]);
    const [userMovies, setUserMovies] = useState(user.movies)

    function handleSubmit(e) {
        e.preventDefault();
        const formData = {
          movie_id: movieId,
          user_id: userId,
          review_content: reviewContent,
        };
        fetch("/reviews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }).then((r) => {
          if (r.ok) {
            r.json().then((movieFromForm) => {
              setReviewContent("");
              setErrors([]);
              handleAddReview(movieFromForm.movies_with_reviews);
              setUser({...user, movies: [...userMovies, movieFromForm]})
            });
          } else {
            r.json().then((err) => setErrors(err.errors));
          }
        });
      }
    
    function handleChange(target) {
        setReviewContent(target)
    }

    return(     
        <form onSubmit={handleSubmit}>
        <h2>Add New Review</h2>
        <div>
          <label htmlFor="review">Review</label>
          <input
            type="text"
            id="review"
            value={reviewContent}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
        {errors?.map((err) => (
          <p key={err} style={{ color: "red" }}>
            {err}
          </p>
        ))}
        <button type="submit">Submit</button>
      </form>
    )
}

export default NewReview;