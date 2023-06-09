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
                <Link id="home" className="menu-item" to="/movies">all movies</Link>
                <Link id="about" className="menu-item" to="/my-movies">my movies</Link>
                <Link id="contact" className="menu-item" to="/my-reviews">my reviews</Link>
                <Link id="contact" className="menu-item" to="/new">add movie</Link>
                {/* <a onClick={ showSettings } className="menu-item--small" href="">Settings</a> */}
            </Menu>
        </>
    )
}

export default NavBar;