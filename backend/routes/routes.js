const express = require('express');
const router = express.Router();

const jsonData = require('../pokedex.json');

router.get('/pokemons', (req, res) => {
    try {
        res.json(jsonData);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/pokemons/:id', (req, res) => {
    try {
        const pokemon = jsonData.find(p => p.id === parseInt(req.params.id));
        if (pokemon) {
            res.json(pokemon);
        } else {
            res.status(404).json({ message: "Pokemon not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/pokemons/:id/:info', (req, res) => {
    const pokemon = jsonData.find(p => p.id === parseInt(req.params.id));
    if (!pokemon) {
        return res.status(404).json({ message: "Pokemon not found" });
    }

    const info = req.params.info.toLowerCase();
    if (pokemon.hasOwnProperty(info)) {
        res.json({ [info]: pokemon[info] });
    } else {
        res.status(400).json({ message: "Invalid info requested" });
    }
});

module.exports = router;



