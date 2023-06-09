import React from "react";
import { Link } from "react-router-dom";
import { bubble as Menu } from 'react-burger-menu';


function NavBar({ setUser }){

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
                setUser(null);
            }
        });
    }

    // const showSettings = (event) => {
    //     event.preventDefault();
    //     console.log('Settings clicked!');
    // };

    return(
        // <div className="header">
        //     <nav>
        //         <Link to ="/movies">ALL MOVIES</Link>
        //         <Link to ="/my-movies">MY MOVIES</Link>
        //         <Link to ="/reviews">MY REVIEWS</Link>
        //         <Link to ="/new">ADD MOVIE</Link>
        //         <button onClick={handleLogoutClick}>Logout</button>
        //     </nav>
        // </div>
        <>
            <Menu right>
                <h1 id="logo-h1">Seen It</h1>
                <Link id="home" className="menu-item" to="/movies">all movies</Link>
                <Link id="contact" className="menu-item" to="/reviews">my reviews</Link>
                <Link id="contact" className="menu-item" to="/new">add movie</Link>
                <button onClick={handleLogoutClick}>Logout</button>
            </Menu>
        </>
    )
}

export default NavBar;