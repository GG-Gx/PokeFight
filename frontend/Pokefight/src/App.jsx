import React from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css'
import All from './components/All'
import Info from './components/Info'
import Landing from './components/Landing'
import Fight from './components/Fight';

import { ChakraProvider } from '@chakra-ui/react'


function App() {


  return (
    <ChakraProvider>

    <Router>

      <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/api/pokemons" element={<All />} />
      <Route path="/api/pokemons/:id" element={<Info />} />
      <Route path="/api/pokemons/fight" element={<Fight />} />

      </Routes>
    </Router>
    </ChakraProvider>
  )
}

export default App
