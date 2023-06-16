import { useState } from "react";
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import { Button } from "../styles";

function Login({ onLogin }) {
    const [showLogin, setShowLogin] = useState(true)

    return (
        <div id="login-page">
            <div id="login-h1-container">
                <h1>have you </h1> <h1 id="login-logo"> SEEN IT?</h1>
            </div>
                <h3>review the movies you've seen.<br></br>
                    watch the ones you haven't.</h3>
        
        {showLogin ? (
            <>
                <LoginForm onLogin={onLogin}/>
                <p>Don't have an account?</p>
                <Button id="secondary-login-button" onClick={() => setShowLogin(false)}>Sign Up</Button>
            </>
        ) : (
            <>
                <SignUpForm onLogin={onLogin}/>
                <p>Already have an account?</p>
                <Button id="secondary-login-button" onClick={() => setShowLogin(true)}>Log In</Button>
            </>
        )}
        </div>

    ) 
}

export default Login;