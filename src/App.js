import './App.css';
import React from 'react';
// import {Link} from 'react-router-dom';
// import MyRouter from './router';
// import Home from './pages/Home.js';
import MyRouter from './router/index.js';
import Navbar from './components/navbar.js';
 
function App() {
  return (
    <div>
      {/* <Link to="/">Home</Link>
      <Link to="/about-us">About</Link>
      <Link to="/contact-us">Contact</Link> */}
    {/* <Home/> */}
    <Navbar/> 
    <MyRouter/>
    </div>
  );
}

export default App;
