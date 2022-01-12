import React from "react";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom' ; 
import Login from './screens/Login.js'
import Register from './screens/Register.js'
import './bootstrap.min.css'
import Home from "./screens/Home.js";
import UpdateNote from "./screens/UpdateNote.js";

function App() {

  return (
    <>
      <Router>
        <Routes>

          <Route exact path='/' element={<Login /> } />
          <Route exact path='/registeruser' element={<Register />} />
          <Route exact path='/home' element={<Home />} /> 
          <Route exact path='/updatenote/:id' element={<UpdateNote />} />
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
