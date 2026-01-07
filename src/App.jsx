import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import HomePage from "./HomePage/HomePage";
import MenuPage from "./MenuPage/MenuPage";
import './App.css'
import { Routes, Route } from "react-router-dom";

function App() {


  return (
    <>
      <main className='App'>
      <Routes id="routes">
        <Route path="/" element={<HomePage/>}/>
        <Route path="/menu" element={<MenuPage/>}/>
      </Routes>
      </main>
    </>
  )
}

export default App
