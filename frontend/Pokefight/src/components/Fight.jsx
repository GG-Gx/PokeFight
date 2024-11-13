import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Heading,
  Select,
  Image,
  Center,
  CardBody,
  UnorderedList,
  Flex,
  Box,
  Button,
  Text,
  CardFooter,
  Stack
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Fight() {
  const [pokemonList, setPokemonList] = useState([]); 
  const [selectedPokemonId1, setSelectedPokemonId1] = useState(null); 
  const [selectedPokemonId2, setSelectedPokemonId2] = useState(null);
  const [selectedPokemon1, setSelectedPokemon1] = useState(null); 
  const [selectedPokemon2, setSelectedPokemon2] = useState(null);
  const [fightResult, setFightResult] = useState(null);


  useEffect(() => {
    fetch("https://pokeapiggg.vercel.app/api/pokemons", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPokemonList(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  const handlePokemonChange1 = (event) => {
    const selectedId = parseInt(event.target.value);
    setSelectedPokemonId1(selectedId);
    setSelectedPokemon1(pokemonList.find((pokemon) => pokemon.id === selectedId));
  };

  const handlePokemonChange2 = (event) => {
    const selectedId = parseInt(event.target.value);
    setSelectedPokemonId2(selectedId);
    setSelectedPokemon2(pokemonList.find((pokemon) => pokemon.id === selectedId));
  };


  const handleFight = () => {
    if (!selectedPokemon1 || !selectedPokemon2) {
      setFightResult("Please select two Pokemon to fight!");
      return;
    }

    const attributes = ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'];
    let winner = null;

    for (let attribute of attributes) {
      if (selectedPokemon1.base[attribute] > selectedPokemon2.base[attribute]) {
        winner = selectedPokemon1;
      } else if (selectedPokemon1.base[attribute] < selectedPokemon2.base[attribute]) {
        winner = selectedPokemon2;
      }

      // If there's a winner in this attribute comparison, break out of the loop
      if (winner) {
        break;
      }
    }

    if (winner) {
      setFightResult({
        message: `The winner is ${winner.name.english}!`,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${winner.id}.gif`
      });
    } else {
      setFightResult("It's a tie!");
    }
  };

  
 

 
  return (
    <>
      <Heading>Choose your Pokemon</Heading>
      <Flex direction="row" justifyContent="center">
      <Box>
      <h2>Player 1</h2>
      <Select placeholder="Select Pokemon 1" onChange={handlePokemonChange1}>
        {pokemonList.map((pokemon) => (
          <option key={pokemon.id} value={pokemon.id}>
            {pokemon.name.english}
          </option>
        ))}
      </Select>

      {selectedPokemon1 && (
        <Card maxW='sm'>
          <CardBody>
          <Center>
          <Image

            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${selectedPokemon1.id}.png`}
            alt={selectedPokemon1.name.english}
            boxSize="100px"
            objectFit="cover"
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            style={{ transition: "transform 0.3s ease-in-out" }}
          />
          </Center>
          <Stack spacing={3}>
          <Heading as="h3" size="lg">
              {selectedPokemon1.name.english}
            </Heading>
          </Stack>
       
          </CardBody>
          <CardFooter>
          <UnorderedList styleType="none">
              <li>Type: {selectedPokemon1.type.join(", ")}</li>
              <li>Attack: {selectedPokemon1.base.Attack}</li>
              <li>Defense: {selectedPokemon1.base.Defense}</li>
              <li>HP: {selectedPokemon1.base.HP}</li>
              <li>Speed: {selectedPokemon1.base.Speed}</li>
              <li>Sp. Attack: {selectedPokemon1.base["Sp. Attack"]}</li>
              <li>Sp. Defense: {selectedPokemon1.base["Sp. Defense"]}</li>
            </UnorderedList>
          </CardFooter>
        </Card>
      )}
      </Box>
      <Center><Image src="https://upload.wikimedia.org/wikipedia/commons/7/70/Street_Fighter_VS_logo.png"

      alt="VS"
      boxSize="100px"
      objectFit="fit"
      margin={10}
      /></Center>
      

      <Box>
      <h2>Player 2</h2>
      <Select placeholder="Select Pokemon 2" onChange={handlePokemonChange2}>
        {pokemonList.map((pokemon) => (
          <option key={pokemon.id} value={pokemon.id}>
            {pokemon.name.english}
          </option>
        ))}
      </Select>

      {selectedPokemon2 && (
        
        <Card>
        
          <CardBody>
          <Center>
          <Image
            
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${selectedPokemon2.id}.png`}
            alt={selectedPokemon2.name.english}
            boxSize="100px"
            objectFit="cover"
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            style={{ transition: "transform 0.3s ease-in-out" }}
          />
          </Center>
        <Stack spacing={3}>
        <Heading as="h3" size="lg">
              {selectedPokemon2.name.english}
            </Heading>
        </Stack>
          </CardBody>

      

      
        <CardFooter>
          <UnorderedList styleType="none">
              <li>Type: {selectedPokemon1.type.join(", ")}</li>
              <li>Attack: {selectedPokemon1.base.Attack}</li>
              <li>Defense: {selectedPokemon1.base.Defense}</li>
              <li>HP: {selectedPokemon1.base.HP}</li>
              <li>Speed: {selectedPokemon1.base.Speed}</li>
              <li>Sp. Attack: {selectedPokemon1.base["Sp. Attack"]}</li>
              <li>Sp. Defense: {selectedPokemon1.base["Sp. Defense"]}</li>
            </UnorderedList>
          </CardFooter>
        </Card>
        
      )}
      </Box>
      </Flex>
      <Center>
      <Button margin={5} onClick={handleFight}>Fight!</Button>
      </Center>
 
  {fightResult && (
          
          <Flex  direction="column" alignItems="center">
            
          <Heading>{fightResult.message}</Heading>
          <Card>
          <Image src={fightResult.imageUrl} alt="fight"
           boxSize="100px"
           objectFit="fit"
            margin={10}
          />
          </Card>
          </Flex>
          
          
      )}
      <Button as={Link} to="/api/pokemons"
      margin={1}
      >Back to Pokemon List</Button>
    </>
  );
}

export default Fight;


