import  react from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter, Button, Heading, UnorderedList, ListItem, Text, Image, Box, Center, Flex } from '@chakra-ui/react'

function Info() {
  const { id } = useParams();
  const [pokemonData, setPokemonData] = useState(null);
  const [pokeImg , setPokeImg] = useState(null);  

  useEffect(() => {
    fetch(`http://localhost:3001/api/pokemons/${id}`, {
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
  }, [id]);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
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
      setPokeImg(data.sprites.front_default); // Update the state with fetched data
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    }
    );
  }, [id]);

  return (
    <Box>
      
      <Card display="flex" justifyContent="center" alignItems="center"
      margin={4}>
      {pokemonData && (
        <div>
          <CardHeader>
          <Heading as="h3" size="lg">{pokemonData.name.english}</Heading>

          </CardHeader>
          <Flex direction="column" display="flex" flexWrap="wrap"  alignItems="center" > 

          <CardBody>
          <Image src={pokeImg} alt={pokemonData.name.english}
            boxSize="100px"
            objectFit="cover"
            mx="auto"
            my="auto" />
          
          
          
          <UnorderedList styleType="none">
            <ListItem><Text>Type: {pokemonData.type.join(", ")}</Text></ListItem>
            <ListItem><Text>Base Stats:</Text></ListItem>
            <ListItem><Text>HP: {pokemonData.base.HP}</Text></ListItem>
            <ListItem><Text>Attack: {pokemonData.base.Attack}</Text></ListItem>
            <ListItem><Text>Defense: {pokemonData.base.Defense}</Text></ListItem>
            <ListItem><Text>Sp. Attack: {pokemonData.base["Sp. Attack"]}</Text></ListItem>
            <ListItem><Text>Sp. Defense: {pokemonData.base["Sp. Defense"]}</Text></ListItem>
            <ListItem><Text>Speed: {pokemonData.base.Speed}</Text></ListItem>
            
          </UnorderedList>
          </CardBody>
          </Flex>
        </div>
        
      )}
      </Card>
      <Button><Link to="/api/pokemons">all Pokemons</Link></Button>

    </Box>
   
  );
}


export default Info;