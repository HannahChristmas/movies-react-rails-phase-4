
function MyMoviesList( {user} ) {

const userMovies = user.movies

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