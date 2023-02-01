
function MyMoviesList( {user} ) {

const userMovies = user.movies

// update state of the user
// When I add or delete a review, let this list of user.movies reflect in state


    return (
        userMovies.map((mov) => {
            return (
                <div key={mov.id}>
                <h1>{mov.title}</h1>
                <p>{mov.genre}</p>
                </div>
            )
        })
       
    )
}

export default MyMoviesList;