const express = require('express');
const Pokemon = require('../modules/modules.js');
const router = express.Router();



router.get('/pokemons', async (req, res) => {
  try {
    let pokemons;
    if (req.query.sort === 'true') {
      pokemons = await Pokemon.find().sort({ name: 1 });
    } else {
      pokemons = await Pokemon.find();
    }
    console.log('Pokemons:', pokemons); // Log the retrieved pokemons
    res.json(pokemons);
  } catch (err) {
    console.error('Error fetching pokemons:', err);
    res.status(500).json({ error: err.message });
  }
});



router.get('/pokemons/:id', async (req, res) => {
  try {
    const pokemon = await Pokemon.findById(req.params.id);
    if (pokemon) {
      res.json(pokemon);
    } else {
      res.status(404).json({ error: 'Pokemon not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;




