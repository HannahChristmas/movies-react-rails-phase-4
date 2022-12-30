import '../App.css';
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from './Login.js'
import NavBar from './NavBar.js'

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/me").then((res) => {
      if (res.ok) {
        res.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser}/>

  return (
    <>
      <NavBar setUser={setUser}/>
      <main>
        <Routes>
          <Route path="/"/>
        </Routes>
      </main>
    </>
    // <div className="App">
    //   <header className="App-header">
    //     <h2>Hello</h2>
    //     <p>Welcome to Seen It.</p>
    //   </header>
    // </div>
  );
}

export default App;
