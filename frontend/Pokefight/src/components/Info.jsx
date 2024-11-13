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
    fetch(`https://pokeapiggg.vercel.app/api/pokemons/${id}`, {
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
    <Box p={{ base: 4, sm: 6, md: 8 }} maxW="1200px" mx="auto">
    <Card display="flex" justifyContent="center" alignItems="center" margin={4} boxShadow="lg">
      {pokemonData && (
        <div>
          <CardHeader>
            <Heading as="h3" size="lg" textAlign="center">
              {pokemonData.name.english}
            </Heading>
          </CardHeader>

          <Flex direction={{ base: 'column', md: 'row' }} alignItems="center" justify="center" flexWrap="wrap">
            <CardBody display="flex" flexDirection="column" alignItems="center" justifyContent="center" mb={{ base: 4, md: 0 }}>
              <Image
                src={pokeImg}
                alt={pokemonData.name.english}
                boxSize={{ base: '100px', sm: '150px', md: '200px' }}
                objectFit="cover"
                mb={4}
              />
            </CardBody>

            <CardBody>
              <UnorderedList styleType="none" spacing={2}>
                <ListItem>
                  <Text fontSize={{ base: 'sm', md: 'md' }}>Type: {pokemonData.type.join(", ")}</Text>
                </ListItem>
                <ListItem>
                  <Text fontSize={{ base: 'sm', md: 'md' }}>Base Stats:</Text>
                </ListItem>
                <ListItem>
                  <Text fontSize={{ base: 'sm', md: 'md' }}>HP: {pokemonData.base.HP}</Text>
                </ListItem>
                <ListItem>
                  <Text fontSize={{ base: 'sm', md: 'md' }}>Attack: {pokemonData.base.Attack}</Text>
                </ListItem>
                <ListItem>
                  <Text fontSize={{ base: 'sm', md: 'md' }}>Defense: {pokemonData.base.Defense}</Text>
                </ListItem>
                <ListItem>
                  <Text fontSize={{ base: 'sm', md: 'md' }}>Sp. Attack: {pokemonData.base["Sp. Attack"]}</Text>
                </ListItem>
                <ListItem>
                  <Text fontSize={{ base: 'sm', md: 'md' }}>Sp. Defense: {pokemonData.base["Sp. Defense"]}</Text>
                </ListItem>
                <ListItem>
                  <Text fontSize={{ base: 'sm', md: 'md' }}>Speed: {pokemonData.base.Speed}</Text>
                </ListItem>
              </UnorderedList>
            </CardBody>
          </Flex>
        </div>
      )}
    </Card>

    <Center>
      <Button >
        <Link to="/api/pokemons">All Pokemons</Link>
      </Button>
    </Center>
  </Box>   
  );
}


export default Info;