const express = require('express');
const Pokemon = require('../modules/modules.js');
const router = express.Router();

router.get('/pokemons', async (req, res) => {
    try {
        const pokemons = await Pokemon.find();
        res.json(pokemons);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/pokemons/:id', async (req, res) => {
    try {
        const pokemon = await Pokemon.findById(req.params.id);
        res.json(pokemon);
    } catch (err) {
        res.json({ message: err });
    }
});



module.exports = router;




