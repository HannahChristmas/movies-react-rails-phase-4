import { Box, Movie } from "../styles";
import ToggleReviewPopup from "../components/ToggleReviewPopup";

function UserReviewsList({user, movies, setMovies, userMovies, movie, setMovie, toggleReviewPopup, setToggleReviewPopup, setUser}) {

  const togglePopup = (mov) => {
    setMovie(mov)
    setToggleReviewPopup((toggle) => !toggle);
  }

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
              <>
                <ToggleReviewPopup movie={movie} setMovie={setMovie} setToggleReviewPopup={setToggleReviewPopup} movies={movies} setMovies={setMovies} user={user} setUser={setUser} userMovies={userMovies}/>
              </>
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
