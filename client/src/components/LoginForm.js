import React, { useState } from "react";

function LoginForm ( { onLogin } ) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        setErrors([]);
        fetch("/login", {
            method: "POST", 
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((user) => onLogin(user));
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
            setIsLoading(false);
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username: 
                <input 
                    htmlFor="username"
                    type="text" 
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
            </label>
            <label>
                Password: 
                <input 
                    htmlFor="password"
                    type="password" 
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <button type="submit">{isLoading ? "Loading..." : "Login"}</button>
            <label>
                {errors.map((err) => (
                    <p key={err}>{err}</p>
                ))}
            </label>

        </form>
    )
}

export default LoginForm; 