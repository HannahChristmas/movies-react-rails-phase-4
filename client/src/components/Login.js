import { useState } from "react";
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'


function Login({ onLogin }) {
    const [showLogin, setShowLogin] = useState(true)

    return (
        <div>
        <h1>have you SEEN IT?</h1>
        <h4>review the movies you've seen.<br></br>
        watch the ones you haven't.</h4><br></br>
        
        {showLogin ? (
            <>
            <LoginForm onLogin={onLogin}/>
            <p>Don't have an account?</p>
            <button onClick={() => setShowLogin(false)}>Sign Up</button>
            </>
        ) : (
            <>
            <SignUpForm onLogin={onLogin}/>
            <p>Already have an account?</p>
            <button onClick={() => setShowLogin(true)}>Log In</button>
            </>
        )}
        </div>
    ) 
}

export default Login;