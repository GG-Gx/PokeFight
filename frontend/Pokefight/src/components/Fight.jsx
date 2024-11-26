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
  Stack,
  useBreakpointValue
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
      <Heading textAlign="center" mb={4}>Choose your Pokemon</Heading>
      <Flex direction={{ base: "column", md: "row" }} justifyContent="center" alignItems="center" wrap="wrap">
        <Box w={{ base: "100%", md: "45%" }} p={4}>
          <h2>Player 1</h2>
          <Select placeholder="Select Pokemon 1" onChange={handlePokemonChange1}>
            {pokemonList.map((pokemon) => (
              <option key={pokemon.id} value={pokemon.id}>
                {pokemon.name.english}
              </option>
            ))}
          </Select>

          {selectedPokemon1 && (
            <Card maxW="sm" mt={4}>
              <CardBody>
                <Center>
                  <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${selectedPokemon1.id}.png`}
                    alt={selectedPokemon1.name.english}
                    boxSize={{ base: "80px", sm: "100px" }}
                    objectFit="cover"
                    transition="transform 0.3s ease-in-out"
                    _hover={{ transform: "scale(1.2)" }}
                  />
                </Center>
                <Stack spacing={3} mt={3}>
                  <Heading as="h3" size="lg">{selectedPokemon1.name.english}</Heading>
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

        <Center w="100%" my={{ base: 5, md: 0 }}>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/7/70/Street_Fighter_VS_logo.png"
            alt="VS"
            boxSize={{ base: "80px", sm: "100px" }}
            objectFit="contain"
            mx={{ base: 2, md: 5 }}
          />
        </Center>

        <Box w={{ base: "100%", md: "45%" }} p={4}>
          <h2>Player 2</h2>
          <Select placeholder="Select Pokemon 2" onChange={handlePokemonChange2}>
            {pokemonList.map((pokemon) => (
              <option key={pokemon.id} value={pokemon.id}>
                {pokemon.name.english}
              </option>
            ))}
          </Select>

          {selectedPokemon2 && (
            <Card maxW="sm" mt={4}>
              <CardBody>
                <Center>
                  <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${selectedPokemon2.id}.png`}
                    alt={selectedPokemon2.name.english}
                    boxSize={{ base: "80px", sm: "100px" }}
                    objectFit="cover"
                    transition="transform 0.3s ease-in-out"
                    _hover={{ transform: "scale(1.2)" }}
                  />
                </Center>
                <Stack spacing={3} mt={3}>
                  <Heading as="h3" size="lg">{selectedPokemon2.name.english}</Heading>
                </Stack>
              </CardBody>
              <CardFooter>
                <UnorderedList styleType="none">
                  <li>Type: {selectedPokemon2.type.join(", ")}</li>
                  <li>Attack: {selectedPokemon2.base.Attack}</li>
                  <li>Defense: {selectedPokemon2.base.Defense}</li>
                  <li>HP: {selectedPokemon2.base.HP}</li>
                  <li>Speed: {selectedPokemon2.base.Speed}</li>
                  <li>Sp. Attack: {selectedPokemon2.base["Sp. Attack"]}</li>
                  <li>Sp. Defense: {selectedPokemon2.base["Sp. Defense"]}</li>
                </UnorderedList>
              </CardFooter>
            </Card>
          )}
        </Box>
      </Flex>

      <Center mt={5}>
        <Button onClick={handleFight} isDisabled={!selectedPokemon1 || !selectedPokemon2} colorScheme="blue">
          Fight!
        </Button>
      </Center>

      {fightResult && (
        <Flex direction="column" alignItems="center" mt={5}>
          <Heading>{fightResult.message}</Heading>
          <Card mt={3}>
            <Image src={fightResult.imageUrl} alt="fight result" boxSize="100px" objectFit="contain" margin={10} />
          </Card>
        </Flex>
      )}

      <Center mt={5}>
        <Button as={Link} to="/api/pokemons" colorScheme="teal">Back to Pokemon List</Button>
      </Center>
    </>
  );
}

export default Fight;
