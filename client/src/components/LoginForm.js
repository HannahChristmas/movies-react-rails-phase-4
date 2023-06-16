import React, { useState } from "react";
import { Button, Input, Label } from "../styles";

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
        <form id="login-form" onSubmit={handleSubmit}>
            <Label>
                Username: 
                <Input 
                    htmlFor="username"
                    type="text" 
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
            </Label>
            <Label>
                Password: 
                <Input 
                    htmlFor="password"
                    type="password" 
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
            </Label>
            <Button id="login-button" type="submit">{isLoading ? "Loading..." : "Login"}</Button>
            <Label>
                {errors?.map((err) => (
                    <p key={err}>{err}</p>
                ))}
            </Label>
        </form>
    )
}

export default LoginForm; 