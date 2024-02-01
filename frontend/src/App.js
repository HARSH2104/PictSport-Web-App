import './App.css';
import Navbar from './components/Navbar';
import AboutUs from './components/AboutUs';
import SellItem from './components/SellItem';
import Home from './components/Home';
import InfoOfItem from './components/InfoOfItem';
import NoteState from './context/notes/NoteState';
import Profile from './components/Profile';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

// import React, { useState } from 'react'

function App() {

  // const [idOfOtem, setId] = useState(0);


  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path='/aboutUs' element={<AboutUs />}> </Route>
            <Route exact path='/SellItem' element={<SellItem />}> </Route>
            <Route exact path='/' element={<Home />}> </Route>
            <Route exact path='/infoofitem' element={<InfoOfItem />}> </Route>
            <Route exact path='/profile' element={<Profile />}> </Route>
          </Routes>
        </Router>
      </NoteState>
    </>

  );
}

export default App;
