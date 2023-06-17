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

    return(
        <>
            <Menu right>
                <h1 id="logo-h1">Seen It</h1>
                <Link id="home" className="menu-item" to="/movies">all movies</Link>
                <Link id="contact" className="menu-item" to="/reviews">my reviews</Link>
                <Link id="contact" className="menu-item" to="/new">add movie</Link><br></br>
                <button id="logout-button" onClick={handleLogoutClick}>Logout</button>
            </Menu>
        </>
    )
}

export default NavBar;