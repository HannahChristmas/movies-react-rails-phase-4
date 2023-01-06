import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { Box } from "../styles";
import NewReview from './NewReview.js'

function MovieCard( {user, movies } ) {
    const { id } = useParams();    
    const [movie, setMovie] = useState({});
    const [status, setStatus] = useState("pending")
    const foundMovie = movies.find(mov => mov.id === parseInt(id))
    
    useEffect(() => {
        console.log(foundMovie.movies_with_reviews)
        if (foundMovie) {
            setMovie(foundMovie)
            setStatus("found")
        } else {
            setStatus("rejected")
        }
    }, [id, movies])

    function handleAddReview(updatedReviews) {
        foundMovie.movies_with_reviews = updatedReviews
        setMovie({...foundMovie})
    }

    if (status === "pending") return <h2>Loading...</h2>;
    // Don't want another fetch request just for errors. 
    if (status === "rejected") return <h2>Error: Movie doesn't exist</h2>;


    return (
        <Wrapper>
            <Box>
                <img className="poster" alt={movie.title}src={movie.image_url}/>
                <h1>{movie.title}</h1>
                <h1>{movie.genre}</h1>
                <h1>{movie.year}</h1>
            </Box>
            <Box>
                <NewReview handleAddReview={handleAddReview} movieId={movie.id} userId={user.id}></NewReview>
                {movie.movies_with_reviews?.map((review) => (
                    <Box key={review.review_id}>
                        {review.review_content}<br></br><br></br>
                        by: <em>{review.username}</em><br></br>
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