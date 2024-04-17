import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Image, Center, AbsoluteCenter } from "@chakra-ui/react";



function Landing() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
    <Center>
      
      <Link to="/api/pokemons">
      <Image 
        src="https://archives.bulbagarden.net/media/upload/a/a7/Sun_Version_logo_Jp.png"
        alt="Pokemon logo"
        style={{ 
          transform: isHovered ? 'scale(1.2)' : 'scale(1)',
          transition: 'transform 0.3s ease-in-out'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      <h1>Welcome to the Pokemon API!</h1>
      </Link>
    </Center>
      </>
  );
}


export default Landing;