import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Image, Center, AbsoluteCenter, Box } from "@chakra-ui/react";



function Landing() {
  const [isHovered, setIsHovered] = useState(false);
  return (

 
    <Box p={{ base: 4, sm: 6, md: 8 }} maxW="1200px" mx="auto">
    <Center>
      
      <Link to="/api/pokemons">
      <Image 
        src="https://preview.redd.it/xn4we2ozfpv01.png?width=1938&format=png&auto=webp&s=f318dbdbfeae3274cb3fa7f5ee64ab23cfeb8767"
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
    </Box>

  );
}


export default Landing;