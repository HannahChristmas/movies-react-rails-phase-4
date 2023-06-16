import { Button, Input } from "../styles";
import { useState, useEffect } from "react";

function ToggleReviewPopup({ setToggleReviewPopup, movie, setMovie, movies, setMovies, user, setUser, userMovies }) {
    const [updateReview, setUpdateReview] = useState("")

    const userReview = movie.movies_with_reviews?.find(review => review.username === user.username)

    useEffect(() => {
        if (userReview) {
            setUpdateReview(userReview.review_content)
        }
    }, [userReview])

    const togglePopup = () => {
        setToggleReviewPopup((toggle) => !toggle);
        console.log("userReview from TRPU.js from MovieCard.js", userReview)
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
            movie.movies_with_reviews = filteredReview 
            setMovie({...movie})
            const newMovies = movies.map(mov => {
                if ( movie.id === mov.id ){
                    return movie
                } else {
                    return mov
                }
            })
            const userUpdatedMovies = userMovies.filter(mov => movie.id !== mov.id)
            setMovies(newMovies)
            setUser({...user, movies: userUpdatedMovies})
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
            setUser({...user, movies: newMovies})

            console.log("userMovies after: ", userMovies)

        })   
    }

    return (
        <>
        <div id="popup-overlay">
            <div id="popup-content">
                <Button id="close-button" onClick={togglePopup}>X</Button>
                <form>
                <Input
                    type="text"
                    id="review"
                    value={updateReview}
                    onChange={(e) => setUpdateReview(e.target.value)}
                />
                <div id="delete-post-div">
                    <Button id="delete-button" onClick={() => handleDelete(userReview.review_id)}>DELETE</Button>     
                    <Button onClick={(e) => handleUpdateReview(e, userReview.review_id)} color="primary" type="submit">
                    POST
                    </Button>
                </div>
                </form>
            </div>
        </div>
        </>
    ) 
}

export default ToggleReviewPopup;