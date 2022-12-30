import React from "react";

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
            <h2>SEEN IT</h2>
            <button onClick={handleLogoutClick}>Logout</button>
        </>
    )
}

export default NavBar;