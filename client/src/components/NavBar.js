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
                <Link to ="/movies">ALL MOVIES</Link>
                <Link to ="/my-movies">MY MOVIES</Link>
                <Link to ="/reviews">MY REVIEWS</Link>
                <Link to ="/new">ADD MOVIE</Link>
                <button onClick={handleLogoutClick}>Logout</button>
            </nav>
        </div>
    )
}

export default NavBar;