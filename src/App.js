import React, { useState } from 'react';
import './App.css';
import NavBar from './components/Navbar.js'
import SearchPlayers from "./pages/SearchPlayers.js"
import Home from "./pages/Home.js"
import {  Route, Routes } from 'react-router-dom';


function App() {


  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/PlayerSearch" element={<SearchPlayers />} />
      </Routes>
    </>
  );
}

export default App;
