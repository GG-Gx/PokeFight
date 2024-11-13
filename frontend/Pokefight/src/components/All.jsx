import React from "react";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Heading, UnorderedList, ListItem, Text, Image, Box, Flex, Button } from '@chakra-ui/react'
import { Link } from "react-router-dom";



function All() {

  const [pokemonData, setPokemonData] = useState(null);
  const [isHovered, setIsHovered] = useState(false);


  useEffect(() => {
    fetch('http://localhost:3001/api/pokemons', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setPokemonData(data); // Update the state with fetched data
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }, []);






  return (
    <> 
    <Link to ="/api/pokemons/fight" ><Button>Make them fight!</Button></Link>
    <Flex direction="column" alignItems="center"

     >
      {pokemonData && (
        <Box direction="row" display="flex" flexWrap="wrap"  alignItems="center" 
        >
          {pokemonData.map((pokemon) => (
            <Link to={`/api/pokemons/${pokemon.id}`} key={pokemon.id}>
            <Card 
            display="flex" justifyContent="center" alignItems="center"
             margin={1} key={pokemon.id}
             boxShadow="lg"
             
             >
              <CardHeader>
              <Heading as="h3" size="lg">{pokemon.name.english}</Heading>
              </CardHeader>
              <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                  alt={pokemon.name.english}
                  boxSize="100px" 
                  objectFit="cover" 

                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  style={{ transition: 'transform 0.3s ease-in-out' }}
                />
              <CardBody>
                <Text>{pokemon.type.join(", ")}</Text>
              </CardBody>
                
              
             </Card>
            </Link>
          ))}
        </Box>
           
      )}
      </Flex>
    </>
  );
}

export default All;