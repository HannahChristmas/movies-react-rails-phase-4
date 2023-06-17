import { Box, Movie } from "../styles";
import ToggleReviewPopup from "../components/ToggleReviewPopup";

function UserReviewsList({ user, setUser, movie, setMovie, movies, setMovies, userMovies, toggleReviewPopup, setToggleReviewPopup }) {

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
                <ToggleReviewPopup 
                  user={user} 
                  setUser={setUser} 
                  movie={movie} 
                  setMovie={setMovie} 
                  movies={movies} 
                  setMovies={setMovies} 
                  userMovies={userMovies}
                  setToggleReviewPopup={setToggleReviewPopup}/>
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
