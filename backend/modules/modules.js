const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({

    id: { type: Number, required: true },


    name: { 
        english: { type: String, required: true },
        japanese: { type: String },
        chinese: { type: String },
        french: { type: String }
    },
    type: [{ 
        type: String, 
        required: true 
    }],
    base: {
        HP: { type: Number, required: true },
        Attack: { type: Number, required: true },
        Defense: { type: Number, required: true },
        "Sp. Attack": { type: Number, required: true },
        "Sp. Defense": { type: Number, required: true },
        Speed: { type: Number, required: true }
    }
});

module.exports = mongoose.model('Pokemon', PokemonSchema);


