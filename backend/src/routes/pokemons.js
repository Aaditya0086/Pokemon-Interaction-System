import express from 'express';
import { getAllPokemons, getSearchedPokemons } from '../controllers/pokemons.js';

const pokemon = express.Router();

pokemon
    .get('/', getAllPokemons)
    .get('/search', getSearchedPokemons)

export default pokemon;