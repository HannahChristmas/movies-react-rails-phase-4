import React from "react";
import { Link } from "react-router-dom";

function NavBar({ setUser }){

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
                setUser(null);
            }
        });
    }

    return(
        <div className="header">
            <nav>
                <Link to ="/allmovies">SEEN IT</Link>
                <Link to ="/allmovies">ALL MOVIES</Link>
                <Link to ="/myreviews">MY REVIEWS</Link>
                <Link to ="/new">ADD MOVIE</Link>
                {/* <Link to ="/addrecipe"><img className="navImage"src={dinnerborder} alt={"dinner"}></img></Link> */}
                <button onClick={handleLogoutClick}>Logout</button>
            </nav>
        </div>
        // <>
        //     <h2 as={Link} to="/allmovies">SEEN IT</h2>
        //     <button as={Link} to="/allmovies">All Movies</button>
        //     <button as={Link} to="/mymovies">My Movies</button>
        //     <button as={Link} to="/new">Add Movie</button>
        //     <button onClick={handleLogoutClick}>Logout</button>
        // </>
    )
}

export default NavBar;