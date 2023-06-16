import React, { useState } from "react";
import { Button, Input, Label } from "../styles";


function SignUpForm ( {onLogin} ) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch("/signup", {
            method: "POST", 
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                username, 
                password,
                password_confirmation: passwordConfirmation,
                avatar_url: avatarUrl,
            }),
        }).then((r) => {
            setIsLoading(false);
            if (r.ok) {
                r.json().then((user) => onLogin(user));
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        });
    }

    return (
        <form id="login-form" onSubmit={handleSubmit}>
            <Label>
                Username: 
                <Input 
                    type="text" 
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
            </Label>
            <Label>
                Password: 
                <Input 
                    type="password" 
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
            </Label>
            <Label>
                Password Confirmation: 
                <Input 
                    type="password" 
                    id="password_confirmation"
                    autoComplete="current-password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}/>
            </Label>
            <Label>
                Profile Image: 
                <Input 
                    type="text" 
                    id="avatar_url"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}/>
            </Label>
            <Button id="primary-login-button" type="submit">{isLoading ? "Loading..." : "Sign Up"}</Button>
            <Label>
                {errors.map((err) => (
                    <p key={err}>{err}</p>
                ))}
            </Label>
        </form>
    )
}

export default SignUpForm; 